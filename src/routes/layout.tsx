import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { type RequestHandler, type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

import styles from "./styles.css?inline";

export const useUser = routeLoader$(({ request }) => {
  const data = request.headers.get("x-ms-client-principal");

  if (data) {
    const encoded = Buffer.from(data, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);
    return clientPrincipal.userDetails;
  }

  return undefined;
});

export const head: DocumentHead = {
  title: "State of Micro Frontends 2023",
  meta: [
    {
      name: "description",
      content: "The survey to obtain the state of Micro Frontends 2023.",
    },
  ],
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });
};

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
