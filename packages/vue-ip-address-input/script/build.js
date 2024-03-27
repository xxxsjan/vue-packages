import esbuild from "esbuild";
import path from "node:path";
import vuePlugin from "esbuild-plugin-vue3";

const __cwd = process.cwd();

const outfile = path.resolve(__cwd, `./dist/bundle.es.js`);

/** @type {import('esbuild').BuildOptions} **/
const options = {
  bundle: true,
  entryPoints: [path.resolve(__cwd, `./src/index.ts`)],
  outfile,
  // entryNames: "[dir]/[name]-[hash]",
  external: ["vue"],
  sourcemap: false,
  format: "esm",
  globalName: "GLOBAL_VAL",
  platform: "browser",
  // https://esbuild.github.io/content-types
  loader: {},
  plugins: [
    vuePlugin(),
    {
      name: "log-rebuild",
      setup(build) {
        build.onEnd((result) => {
          console.log(`[log-rebuild] built : ${path.relative(__cwd, outfile)}`);
        });
      },
    },
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
};

// esbuild.context(options).then((ctx) => ctx.watch());

esbuild.build(options).then((result) => {
  console.log("result: ", result);
});
