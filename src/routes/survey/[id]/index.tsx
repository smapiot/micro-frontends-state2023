import { type Component, component$ } from "@builder.io/qwik";
import {
  Form,
  type RequestHandler,
  routeAction$,
  useLocation,
  z,
  zod$,
  Link,
  useNavigate,
  routeLoader$,
} from "@builder.io/qwik-city";

import {
  type ChoicesQuestion,
  type LinearQuestion,
  type TextQuestion,
  questions,
} from "~/data";
import { getQuestionResponse, setQuestionResponse } from "~/db";
import { getUser, isLoggedIn } from "~/helpers";

const questionIds: any = questions.map((q) => q.id);

export const useStoreAnswerAction = routeAction$(
  async ({ question, answer }, { request }) => {
    const q = questions.find((m) => m.id === question);
    const user = getUser(request);

    if (!q) {
      return {
        success: false,
      };
    }

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

    return {
      success: true,
    };
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

  if (question) {
    const user = getUser(request);
    const answer = await getQuestionResponse(user, question.id);
    return answer;
  }

  return undefined;
});

const Text: Component<{ question: TextQuestion; answer: string | undefined }> =
  component$(({ question, answer }) => {
    return (
      <div class="survey-text">
        <textarea
          name="answer"
          value={answer}
          placeholder={question.hint}
          minLength={question.minLength}
          maxLength={question.maxLength}
        />
      </div>
    );
  });

const Linear: Component<{
  question: LinearQuestion;
  answer: string | undefined;
}> = component$(({ question, answer }) => {
  return (
    <div
      class="survey-linear"
      data-min-label={question.minLabel}
      data-max-label={question.maxLabel}
    >
      <input
        type="range"
        name="answer"
        min={question.min}
        max={question.max}
        value={answer}
      />
    </div>
  );
});

function shuffle() {
  return Math.random() - 0.5;
}

function normal(a: number, b: number) {
  return a - b;
}

const Choices: Component<{
  question: ChoicesQuestion;
  answer: string | undefined;
}> = component$(({ question, answer }) => {
  const type = question.max === 1 ? "radio" : "checkbox";
  const sorter = type === "checkbox" ? shuffle : normal;
  const optionMap = question.options.map((_, i) => i).sort(sorter);
  const answers = JSON.parse(answer || "[]") as Array<string>;
  const options = optionMap.map((i) => question.options[i]);

  return (
    <div class="survey-choices-container">
      <div class="survey-choices">
        {options.map((option) => (
          <label key={option}>
            <input
              type={type}
              name="answer[]"
              value={option}
              checked={answers.includes(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default component$(() => {
  const { id } = useLocation().params;
  const answer = useAnswer();
  const action = useStoreAnswerAction();
  const navigate = useNavigate();
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
      <Form
        action={action}
        spaReset
        onSubmitCompleted$={({ detail }) => {
          if (detail.value.success) {
            if (next) {
              navigate(`/survey/${next.id}`);
            } else {
              navigate(`/closing`);
            }
          }
        }}
      >
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
