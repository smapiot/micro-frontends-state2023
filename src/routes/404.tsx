import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">Page</span> not found
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        The page you are looking for does not exist.
      </div>
    </>
  );
});
