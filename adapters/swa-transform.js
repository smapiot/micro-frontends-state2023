const { build } = require("esbuild");
const { resolve } = require("path");
const { rmSync, readdirSync, renameSync } = require("fs");

const fnFn = "function.json";
const targetFn = "render.js";

const targetDir = resolve(__dirname, "../azure-functions/render");
const fnJson = resolve(targetDir, fnFn);
const { scriptFile } = require(fnJson);
const allowedFiles = ['build', fnFn, targetFn];

build({
  entryPoints: [resolve(targetDir, scriptFile)],
  format: "cjs",
  bundle: true,
  outfile: resolve(targetDir, targetFn),
}).then(
  (result) => {
    if (result.warnings.length) {
      console.warn("Encountered build warnings:", result.warnings);
    }

    if (result.errors.length) {
      console.error("Encountered build errors:", result.errors);
      process.exit(1);
    }

    const files = readdirSync(targetDir);

    for (const file of files) {
      if (!allowedFiles.includes(file)) {
        rmSync(resolve(targetDir, file));
      }
    }

    renameSync(resolve(targetDir, targetFn), resolve(targetDir, scriptFile));
  },
  (err) => {
    console.error("Something bad happened", err);
    process.exit(1);
  }
);
