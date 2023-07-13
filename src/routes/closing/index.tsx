import { component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

import { isLoggedIn } from "~/helpers";

import styles from "./closing.module.css";

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
          <span class="highlight">Thanks</span> for Your Insights
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        <p class={styles.paragraph}>
          Thanks for participating in this year's{" "}
          <b>State of Micro Frontends</b> survey. You can always go back and
          modify your responses by starting the survey again.
        </p>
      </div>
    </>
  );
});
