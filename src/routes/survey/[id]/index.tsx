import { component$ } from "@builder.io/qwik";
import {
  Form,
  type RequestHandler,
  routeAction$,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";

import { questions } from "~/data";

export const useAddToListAction = routeAction$(
  () => {
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
  })
);

function isLoggedIn() {
  return true;
}

export const onRequest: RequestHandler = async ({ redirect }) => {
  if (!isLoggedIn()) {
    throw redirect(308, "/login");
  }
};

export default component$(() => {
  const { id } = useLocation().params;
  const action = useAddToListAction();
  const question = questions.find((m) => m.id === id);

  if (!question) {
    return (
      <>
        <div class="container container-center">
          <h1>
            <span class="highlight">Nothing</span> Found
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div class="container container-center">
        <h1>
          {question.question}
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center"></div>

      <div class="container container-center">
        <Form action={action} spaReset>
          
          <button type="submit" class="button-dark">
            Next
          </button>
        </Form>
      </div>
    </>
  );
});
