import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

console.log("NODE_ENV", process.env.NODE_ENV);

/** @type {import('rollup').RollupOptions} */
const defaultConfig = {
  input: "./src/index.js",
  output: {
    dir: "./lib", // 输出目录
    format: "es", // 输出格式, 可选值: amd, cjs, es, iife, umd
    banner: "#! /usr/bin/env node", // 添加头部
    // sourcemap: true, // 是否生成sourcemap, 默认为false
    // globals, // 外部依赖,
  },
  plugins: [
    commonjs(),
    json(),
    // terser({
    //   compress: {
    //     drop_console: true,
    //   },
    // }),
  ],
};

export default defaultConfig;
