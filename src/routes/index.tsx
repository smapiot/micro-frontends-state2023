import { component$ } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";

import { getRegisteredUsers } from "~/db";
import { isLoggedIn } from "~/helpers";

import githubLogo from "~/components/icons/github.svg";

export const useTotalUsers = routeLoader$(async () => {
  const users = await getRegisteredUsers();
  return users.length;
});

export const onRequest: RequestHandler = async ({ redirect, request }) => {
  if (isLoggedIn(request)) {
    throw redirect(308, "/survey");
  }
};

export default component$(() => {
  return (
    <>
      <div class="container container-center">
        <h1>
          The State of
          <br />
          <span class="highlight">Micro Frontends</span>
          <br />
          2023 Survey
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        <a href="/login" class="button button--icon">
          <img src={githubLogo} alt="GitHub Logo" width="24" height="24" />{" "}
          Login with GitHub
        </a>
      </div>

      <div class="container container-center">
        ✨ Curious about the past? Look at the{" "}
        <a
          href="https://dev.to/florianrappl/how-micro-frontends-are-being-implemented-in-2020-a-survey-2l0b"
          target="_blank"
        >
          results of the 2020 survey
        </a>
        .
      </div>
    </>
  );
});
