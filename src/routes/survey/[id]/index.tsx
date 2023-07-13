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
import { questions } from "~/data";
import { getQuestionResponse, setQuestionResponse } from "~/db";
import { getUser, isLoggedIn } from "~/helpers";

const questionIds: any = questions.map((q) => q.id);

export const useStoreAnswerAction = routeAction$(
  async ({ question, answer }, { request, redirect }) => {
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
      case "choices":
        const as = Array.isArray(answer) ? answer : [];

        if (as.length < q.min || as.length > q.max) {
          return {
            success: false,
          };
        }

        if (as.some((m) => !q.options.includes(m))) {
          return {
            success: false,
          };
        }

        await setQuestionResponse(user, question, JSON.stringify(as));
        break;
      case "linear":
        const a = +(answer ?? "0");

        if (isNaN(a) || a < q.min || a > q.max) {
          return {
            success: false,
          };
        }

        await setQuestionResponse(user, question, `${~~a}`);
        break;
      case "text":
        const txt = answer ?? "";
        const l = txt.length;

        if (l > q.maxLength || l < q.minLength) {
          return {
            success: false,
          };
        }

        await setQuestionResponse(user, question, txt);
        break;
    }

    throw redirect(308, next ? `/survey/${next}` : "/closing");
  },
  zod$({
    question: z.enum(questionIds),
    answer: z.any(),
  })
);

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (!isLoggedIn(request)) {
    throw redirect(308, "/login");
  }
};

export const useAnswer = routeLoader$(async ({ request, params }) => {
  const { id } = params;
  const question = questions.find((m) => m.id === id);

  console.log("Rout loader", id, question);

  if (question) {
    const user = getUser(request);
    const answer = await getQuestionResponse(user, question.id);
    console.log("Rout loader answer", answer);
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

        <div class="container container-center">
          {question.type === "text" ? (
            <Text question={question} answer={answer.value} />
          ) : question.type === "linear" ? (
            <Linear question={question} answer={answer.value} />
          ) : (
            <Choices question={question} answer={answer.value} />
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
