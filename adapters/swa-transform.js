const { build } = require("esbuild");
const { resolve } = require("path");
const { rmSync, readdirSync, readFileSync, writeFileSync } = require("fs");

const fnFn = "function.json";
const buildDir = "build";
const targetFn = "render.js";

const targetDir = resolve(__dirname, "../azure-functions/render");
const fnJson = resolve(targetDir, fnFn);
const outfile = resolve(targetDir, targetFn);
const fnContent = require(fnJson);
const allowedFiles = [fnFn, targetFn];
const scriptFile = fnContent.scriptFile;

function replace(original, replacement) {
  const content = readFileSync(outfile, "utf8");
  const updated = content.replace(original, replacement);
  writeFileSync(outfile, updated, "utf8");
}

build({
  entryPoints: [resolve(targetDir, scriptFile)],
  format: "cjs",
  bundle: true,
  outfile,
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
      if (buildDir === file) {
        rmSync(resolve(targetDir, buildDir), {
          recursive: true,
          force: true,
        });
      } else if (!allowedFiles.includes(file)) {
        rmSync(resolve(targetDir, file), {
          force: true,
        });
      }
    }

    fnContent.scriptFile = targetFn;
    fnContent.entryPoint = "default";
    writeFileSync(fnJson, JSON.stringify(fnContent, undefined, 2), "utf8");

    replace(
      '.headers["x-ms-original-url"])',
      '.headers["x-ms-original-url"] || "https://state-2023.microfrontends.cloud/")'
    );

    console.log('All modifications done!');
  },
  (err) => {
    console.error("Something bad happened", err);
    process.exit(1);
  }
);
