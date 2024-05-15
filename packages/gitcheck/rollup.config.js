import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

/** @type {import('rollup').RollupOptions} */
const defaultConfig = {
  input: "./src/index.js",
  output: {
    dir: "./lib",
    format: "es", //   amd, cjs, es, iife, umd
    banner: "#! /usr/bin/env node",
    // sourcemap: true, // default false
    // globals,
  },
  plugins: [
    commonjs(),
    json(),
    terser({
      compress: {
        // drop_console: true,
      },
    }),
  ],
};

export default defaultConfig;
