import { component$ } from "@builder.io/qwik";

import { useUser } from "~/routes/layout";

import githubLogo from "~/components/icons/github.svg";
import mfLogo from "~/components/icons/logo.png";
import styles from "./header.module.css";

export default component$(() => {
  const user = useUser();

  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <img
              src={mfLogo}
              alt="Micro Frontends Logo"
              width="96"
              height="96"
            />
          </a>
        </div>
        <ul>
          <li>
            {user.value ? (
              <a href="/logout" class="button--icon">
                <img
                  src={`https://github.com/${user.value}.png?size=24`}
                  alt="GitHub Avatar"
                  width="24"
                  height="24"
                />
                Logout
              </a>
            ) : (
              <a href="/login" class="button--icon">
                <img
                  src={githubLogo}
                  alt="GitHub Logo"
                  width="24"
                  height="24"
                />
                Login
              </a>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
});
