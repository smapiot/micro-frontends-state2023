import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Starter from "~/components/starter/next-steps/next-steps";
import { createTableService, TableQuery } from "azure-storage";

const ts = createTableService(process.env.DB_NAME!, process.env.DB_PASS!);

function getRegisteredUsers() {
  return new Promise<Array<string>>((resolve, reject) => {
    const q = new TableQuery().where("PartitionKey eq '2023'");
    ts.queryEntities("users", q, undefined!, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.entries.map((e: any) => e.rowKey));
      }
    });
  });
}

export const onRequest: RequestHandler = async ({ request, sharedMap }) => {
  const data = request.headers.get("x-ms-client-principal");
  const users = await getRegisteredUsers();

  if (data) {
    const encoded = Buffer.from(data, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);
    sharedMap.set("user", clientPrincipal.userDetails);
  }

  sharedMap.set("user-count", users.length);
};

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as string;
});

export const useTotalUsers = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user-count") as number;
});

export default component$(() => {
  const user = useUser();
  const total = useTotalUsers();

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
        <p>
          Right now <b>{total} users</b> registered.
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
