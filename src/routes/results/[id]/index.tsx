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

    if (question.type === 'linear') {
      for (let i = question.min; i <= question.max; i++) {
        groups.set(`${i}`, 0);
      }
    } else if (question.type === 'choices') {
      for (const option of question.options) {
        groups.set(option, 0);
      }
    }

    for (const answer of answers) {
      const count = groups.get(answer);

      if (count) {
        groups.set(answer, count + 1);
      } else {
        groups.set(answer, 1);
      }
    }

    return {
      count: answers.length,
      labels: [...groups.keys()],
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
          <div>
            {answers.value?.labels.map((label, i) => (
              <p key={i}>{label}</p>
            ))}
          </div>
        ) : question.type === "linear" ? (
          <BarChart
            key={question.id}
            title="# responses"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        ) : question.min === 1 && question.max === 1 ? (
          <PieChart
            key={question.id}
            title="# responses"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        ) : (
          <BarChart
            key={question.id}
            title="# responses"
            data={answers.value?.data ?? []}
            labels={answers.value?.labels ?? []}
          />
        )}
      </div>

      <div class="container container-center">
        <div class="button-row">
          {previous && (
            <Link class="button button-dark" href={`/results/${previous.id}`}>
              ⬅️ Previous
            </Link>
          )}
          {next && (
            <Link class="button button-dark" href={`/results/${next.id}`}>
              Next ➡️
            </Link>
          )}
        </div>
      </div>
    </>
  );
});
