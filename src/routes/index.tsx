import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getRegisteredUsers } from "~/db";
import { useUser } from "./layout";

import githubLogo from "~/components/icons/github.svg";

export const useTotalUsers = routeLoader$(async () => {
  const users = await getRegisteredUsers();
  return users.length;
});

export default component$(() => {
  const user = useUser();
  const total = useTotalUsers();

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
        {user.value ? (
          <b>{user.value}</b>
        ) : (
          <a href="/login" class="button button--icon">
            <img src={githubLogo} alt="GitHub Logo" width="24" height="24" />{" "}
            Login with GitHub
          </a>
        )}
      </div>

      <div class="container container-center">
        Right now <b>{total} users</b> registered.
      </div>
    </>
  );
});
