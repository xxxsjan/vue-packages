import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

import typescript from "rollup-plugin-typescript2";
export default {
  input: "./src/hmrCallback.ts",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "lib/index.module.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
    }),
    json(),
    babel({
      // presets: ["@babel/preset-env"],
      exclude: "node_modules/**",
      // 被要求最好设置 https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      babelHelpers: "bundled",
    }),
  ],
};
