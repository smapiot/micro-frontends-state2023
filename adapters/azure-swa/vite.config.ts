import { azureSwaAdapter } from "@builder.io/qwik-city/adapters/azure-swa/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

process.env.ORIGIN = "https://state-2023.microfrontends.cloud";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      outDir: "azure-functions/render",
      rollupOptions: {
        input: ["src/entry.azure-swa.tsx", "@qwik-city-plan"],
        output: {
          entryFileNames: `[name].[hash].js`,
          chunkFileNames: `[name].[hash].js`,
        },
      },
    },
    ssr: {
      noExternal: /.*/,
    },
    plugins: [azureSwaAdapter()],
  };
});
