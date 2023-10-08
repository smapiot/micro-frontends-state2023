import { component$ } from "@builder.io/qwik";
import { Link, type RequestHandler } from "@builder.io/qwik-city";

import { surveyActive } from "~/constants";
import { questions } from "~/data";
import { isLoggedIn } from "~/helpers";

const [firstQuestion] = questions;

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (!isLoggedIn(request)) {
    throw redirect(308, "/login");
  } else if (surveyActive) {
    throw redirect(308, "/survey");
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
        <Link href={`/results/${firstQuestion.id}`} class="button">
          See the answers! 🕹
        </Link>
      </div>
    </>
  );
});
