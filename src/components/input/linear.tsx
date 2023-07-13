import { type Component, component$ } from "@builder.io/qwik";

import { type LinearQuestion } from "~/data";

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

export default Linear;
