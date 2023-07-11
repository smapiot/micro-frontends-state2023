import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";

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

export default component$(() => {
  const action = useAddToListAction();

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center"></div>

      <div class="container container-center">
        <Form action={action} spaReset>
          <input type="text" name="text" required />{" "}
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>
      </div>
    </>
  );
});
