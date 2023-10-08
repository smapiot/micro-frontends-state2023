import { component$ } from "@builder.io/qwik";
import {
  Form,
  type RequestHandler,
  routeAction$,
  useLocation,
  z,
  zod$,
  Link,
  routeLoader$,
} from "@builder.io/qwik-city";

import Choices from "~/components/input/choices";
import Linear from "~/components/input/linear";
import Text from "~/components/input/text";

import { surveyActive } from "~/constants";
import { questions } from "~/data";
import { getQuestionResponse, setQuestionResponse } from "~/db";
import { getUser, isLoggedIn } from "~/helpers";

const questionIds: any = questions.map((q) => q.id);

export const useStoreAnswerAction = routeAction$(
  async ({ question, answer, previous }, { request, redirect }) => {
    const qIndex = questions.findIndex((m) => m.id === question);

    if (qIndex === -1) {
      return {
        success: false,
      };
    }

    const user = getUser(request);
    const q = questions[qIndex];
    const next = questions[qIndex + 1]?.id;

    switch (q.type) {
      case "choices": {
        const as = Array.isArray(answer) ? answer : [];

        if (as.length < q.min || as.length > q.max) {
          return {
            success: false,
          };
        }

        if (q.extendOn === undefined && as.some((m) => !q.options.includes(m))) {
          return {
            success: false,
          };
        }

        const current = JSON.stringify(as);

        if (current !== previous) {
          await setQuestionResponse(user, question, current);
        }

        break;
      }
      case "linear": {
        const a = +(answer ?? "0");

        if (isNaN(a) || a < q.min || a > q.max) {
          return {
            success: false,
          };
        }

        const current = `${~~a}`;

        if (current !== previous) {
          await setQuestionResponse(user, question, current);
        }

        break;
      }
      case "text": {
        const current = answer ?? "";
        const l = current.length;

        if (l > q.maxLength || l < q.minLength) {
          return {
            success: false,
          };
        }

        if (current !== previous) {
          await setQuestionResponse(user, question, current);
        }

        break;
      }
    }

    throw redirect(308, next ? `/survey/${next}` : "/closing");
  },
  zod$({
    question: z.enum(questionIds),
    answer: z.any(),
    previous: z.any(),
  })
);

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (!isLoggedIn(request)) {
    throw redirect(308, "/login");
  } else if (!surveyActive) {
    throw redirect(308, "/results");
  }
};

export const useAnswer = routeLoader$(async ({ request, params }) => {
  const { id } = params;
  const question = questions.find((m) => m.id === id);

  if (question) {
    const user = getUser(request);
    const answer = await getQuestionResponse(user, question.id);
    return answer;
  }

  return undefined;
});

export default component$(() => {
  const { id } = useLocation().params;
  const answer = useAnswer();
  const action = useStoreAnswerAction();
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
      <Form action={action} spaReset>
        <input type="hidden" name="question" value={question.id} />
        <input type="hidden" name="previous" value={answer.value} />

        <div class="container container-center">
          {question.type === "text" ? (
            <Text question={question} answer={answer.value} key={question.id} />
          ) : question.type === "linear" ? (
            <Linear question={question} answer={answer.value} key={question.id} />
          ) : (
            <Choices question={question} answer={answer.value} key={question.id} />
          )}
        </div>

        <div class="container container-center">
          <div class="button-row">
            {previous && (
              <Link class="button button-dark" href={`/survey/${previous.id}`}>
                ⬅️ Previous
              </Link>
            )}
            <button type="submit" class="button">
              {next ? "Next ➡️" : "Finish 🎉"}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
});
