import { type Component, component$, useSignal } from "@builder.io/qwik";

import { type ChoicesQuestion } from "~/data";

function shuffle(entries: Array<string>, skipLast: boolean) {
  const last = entries.length - 1;
  return entries.map((_, i) => i).sort((a, b) => {
    if (skipLast) {
      if (a === last) {
        return 1;
      } else if (b === last) {
        return -1;
      }
    }
    
    return Math.random() - 0.5;
  });
}

function normal(entries: Array<string>) {
  return entries.map((_, i) => i);
}

const Choices: Component<{
  question: ChoicesQuestion;
  answer: string | undefined;
}> = component$(({ question, answer }) => {
  const type = question.max === 1 ? "radio" : "checkbox";
  const extender = question.extendOn;
  const canExtend = extender !== undefined;
  const sorter = type === "checkbox" ? shuffle : normal;
  const optionMap = useSignal(() =>
    sorter(question.options, canExtend)
  );
  const answers = JSON.parse(answer || "[]") as Array<string>;
  const options = optionMap.value.map((i) => question.options[i]);
  const showExtend = useSignal(canExtend && answers.includes(extender));

  return (
    <div class="survey-choices-container">
      <div class="survey-choices">
        {options.map((option) => (
          <label key={option}>
            <input
              type={type}
              name="answer[]"
              value={option}
              onChange$={(ev) => {
                if (ev.target.value === extender) {
                  showExtend.value = ev.target.checked;
                }
              }}
              checked={answers.includes(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {showExtend.value && (
        <div class="survey-text">
          <input
            name="answer[]"
            value={answers.find((m) => !options.includes(m))}
          />
        </div>
      )}
    </div>
  );
});

export default Choices;
