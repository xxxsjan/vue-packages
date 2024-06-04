import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import vue from "rollup-plugin-vue";
import clear from "rollup-plugin-clear";

export default [
  {
    input: "packages/ip-input/index.ts",
    output: [
      {
        file: "dist/lib.umd.js",
        format: "umd",
        name: "IpInput",
        globals: {
          vue: "vue",
        },
      },
      {
        file: "./dist/lib.es.js",
        format: "es",
      },
      {
        file: "./dist/lib.cjs.js",
        format: "cjs",
      },
      {
        format: "iife",
        name: "IpInput",
        file: "./dist/lib.iife.js",
        globals: {
          vue: "vue",
        },
      },
    ],
    external: ["vue"],
    plugins: [
      clear({
        targets: ["dist"],
      }),
      vue(),
      typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      postcss({
        plugins: [autoprefixer()],
        // extract: "assets/css/index.css",
      }),
    ],
  },
];
