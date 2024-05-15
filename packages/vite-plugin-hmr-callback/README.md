[![npm version](https://img.shields.io/npm/v/vite-plugin-hmr-callback)](https://www.npmjs.com/package/vite-plugin-hmr-callback) ![npm bundle size](https://img.shields.io/bundlephobia/min/vite-plugin-hmr-callback)

一个可以在热更新后，执行一些回调的vite插件

## Features

- 默认功能提供了显示项目地址的功能

## Installation

```shell
npm install vite-plugin-hmr-callback
```

## Usage

> vite.config.js

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import hmrCallback from "vite-plugin-hmr-callback";

export default defineConfig({
  plugins: [vue(), hmrCallback()],
});

```

## 效果

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304091918913.png)
