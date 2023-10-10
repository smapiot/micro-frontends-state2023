import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useLocation, Link, routeLoader$ } from "@builder.io/qwik-city";

import BarChart from "~/components/charts/BarChart";
import PieChart from "~/components/charts/PieChart";

import { surveyActive } from "~/constants";
import { questions } from "~/data";
import { getAnswers } from "~/db";
import { isLoggedIn } from "~/helpers";

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (!isLoggedIn(request)) {
    throw redirect(308, "/login");
  } else if (surveyActive) {
    throw redirect(308, "/survey");
  }
};

export const useAnswers = routeLoader$(async ({ params }) => {
  const { id } = params;
  const question = questions.find((m) => m.id === id);

  if (question) {
    const answers = await getAnswers(question.id);
    const groups = new Map<string, number>();
    const labels: Array<string> = [];

    if (question.type === "linear") {
      for (let i = question.min; i <= question.max; i++) {
        if (i === question.min) {
          labels.push(question.minLabel);
        } else if (i === question.max) {
          labels.push(question.maxLabel);
        } else {
          labels.push('');
        }

        groups.set(`${i}`, 0);
      }

      for (const answer of answers) {
        const count = groups.get(answer);

        if (count) {
          groups.set(answer, count + 1);
        } else {
          groups.set(answer, 1);
        }
      }
    } else if (question.type === "choices") {
      for (const option of question.options) {
        groups.set(option, 0);
      }

      for (const answer of answers) {
        const values = JSON.parse(answer || "[]") as Array<string>;

        for (const value of values) {
          if (value) {
            const count = groups.get(value);
  
            if (count) {
              groups.set(value, count + 1);
            } else {
              groups.set(value, 1);
            }
          }
        }
      }
      
      labels.push(...groups.keys());
    } else {
      const sep = question.sep || "\n\n";

      for (const answer of answers) {
        const values = answer.split(sep).filter(Boolean);

        for (const value of values) {
          if (!labels.includes(value)) {
            labels.push(value);
          }
        }
      }
    }

    return {
      count: answers.length,
      labels,
      data: [...groups.values()],
    };
  }

  return undefined;
});

export default component$(() => {
  const { id } = useLocation().params;
  const answers = useAnswers();
  const index = questions.findIndex((m) => m.id === id);

  if (index === -1) {
    return (
      <>
        <div class="container container-center">
          <h1>
            <span class="highlight">Nothing</span> Found
          </h1>
        </div>
      </>
    );
  }

  const first = questions[0];
  const last = questions[questions.length - 1];
  const previous = questions[index - 1];
  const next = questions[index + 1];
  const question = questions[index];

  return (
    <>
      <div class="container container-center">
        <p>
          <small>
            {index + 1} / {questions.length}
          </small>
        </p>
        <h2>{question.question}</h2>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        Received <strong>{answers.value?.count}</strong> answers
      </div>

      <div class="container container-center">
        {question.type === "text" ? (
          <ul style="display: flex; flex-wrap: wrap; gap: 1rem; list-style: none; max-width: 1200px; margin: auto">
            {answers.value?.labels.map((label, i) => (
              <li key={i} style="margin: 0; padding: 0.3rem 0.6rem; background: #000; border-radius: 7px;">{label}</li>
            ))}
          </ul>
        ) : question.type === "linear" ? (
          <BarChart
            key={question.id}
            title="count"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        ) : question.min === 1 && question.max === 1 ? (
          <PieChart
            key={question.id}
            title="count"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        ) : (
          <BarChart
            key={question.id}
            title="count"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        )}
      </div>

      <div class="container container-center">
        <div class="button-row">
          {previous ? (
            <Link class="button button-dark" href={`/results/${previous.id}`}>
              ⬅️ Previous
            </Link>
          ) : (
            <Link class="button button-dark" href={`/results/${last.id}`}>
              ↪️ Last
            </Link>
          )}
          <Link class="button button-dark" href={`/results`}>
              Home
            </Link>
          {next ? (
            <Link class="button button-dark" href={`/results/${next.id}`}>
              Next ➡️
            </Link>
          ) : (
            <Link
              class="button button-dark"
              href={`/results/${first.id}`}
            >
              First ↩️
            </Link>
          )}
        </div>
      </div>
    </>
  );
});
