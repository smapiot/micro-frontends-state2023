import { type Component, component$ } from "@builder.io/qwik";

import { type TextQuestion } from "~/data";

const Text: Component<{
  question: TextQuestion;
  answer: string | undefined;
}> = component$(({ question, answer }) => {
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

export default Text;
