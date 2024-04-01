import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import pkg from "../package.json";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,// dist/index.cjs.js
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    {
      file: pkg.module,// dist/index.esm.js
      format: "esm",
      sourcemap: true,
      exports: "auto",
    },
    {
      file: pkg.jsdelivr,// dist/index.umd.js
      format: "umd",
      name: "usefulUtils",
      sourcemap: true,
      exports: "auto",
    },
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
