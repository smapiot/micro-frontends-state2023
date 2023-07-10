import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Starter from "~/components/starter/next-steps/next-steps";

export const onRequest: RequestHandler = async ({ request, sharedMap }) => {
  const data = request.headers.get("x-ms-client-principal");

  if (data) {
    const encoded = Buffer.from(data, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);
    sharedMap.set("user", clientPrincipal.userDetails);
  }
};

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as string;
});

export default component$(() => {
  const user = useUser();

  return (
    <>
      <Hero />
      <Starter />

      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>

      <div class="container container-center container-spacing-xl">
        <h3>
          You can <span class="highlight">count</span>
          <br /> on me
        </h3>
        <Counter />
        <p>
          {user.value ? (
            <b>{user.value}</b>
          ) : (
            <a href="/login">Login with GitHub</a>
          )}
        </p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
