import { type Component, component$ } from "@builder.io/qwik";

import { type ChoicesQuestion } from "~/data";

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

export default Choices;
