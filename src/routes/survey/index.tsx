import { component$ } from "@builder.io/qwik";
import { Link, type RequestHandler } from "@builder.io/qwik-city";

import { questions, sections } from "~/data";
import { isLoggedIn } from "~/helpers";

import styles from "./survey.module.css";

const [firstQuestion] = questions;
const numCount = ~~(questions.length / sections.length);

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (!isLoggedIn(request)) {
    throw redirect(308, "/login");
  }
};

export default component$(() => {
  return (
    <>
      <div class="container container-center">
        <h1>
          Micro Frontends
          <br />
          <span class="highlight">Survey</span> 2023
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        <p class={styles.paragraph}>
          Thanks for participating in this year's{" "}
          <b>State of Micro Frontends</b> survey. We've divided the questions
          into several categories:
        </p>

        <ul class={styles.list}>
          {sections.map((section) => (
            <li key={section.id} class={styles.listItem}>
              {section.title}
            </li>
          ))}
        </ul>

        <p class={styles.paragraph}>
          Each category has around {numCount} questions.
        </p>
      </div>

      <div class="container container-center">
        <Link href={`/survey/${firstQuestion.id}`} class="button">
          Start the survey! 🕹
        </Link>
      </div>

      <div class="container container-center">
        <p class={styles.paragraph}>
          You can stop and continue the survey any time. The survey is open in
          July 2023.
        </p>
        <p class={styles.paragraph}>
          We'll publish the results on this page after the survey has concluded.
          Just check back here in August to see the results. We'll also write a
          short blog post about the results.
        </p>
      </div>
    </>
  );
});
