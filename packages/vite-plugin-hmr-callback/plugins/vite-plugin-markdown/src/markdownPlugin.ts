import { Plugin } from "vite";
import path from "path";
import fs from "fs";
// https://github.com/lishengqin/vitejs-plugin-markdown

// const MarkdownIt = require("markdown-it");
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

export const transformMarkdown = (mdText: string): string => {
  // 加上一个 class 名为 article-content 的 wrapper，方便我们等下添加样式
  return `
    <section class='article-content'>
      ${md.render(mdText)}
    </section>
  `;
};
const mdRelationMap = new Map<string, string>();
function markdownPlugin(): Plugin {
  return {
    name: "vite :markdown",
    enforce: "pre",
    /* 类似于 webpack 的 loader  */
    transform(code, id, opt) {
      // code：文件的源码字符串
      // id：文件的路径path
      // opt：{ssr：boolean}
      const vueRE = /\.vue$/;
      const markdownRE = /\<g-markdown.*\/\>/g;
      if (!vueRE.test(id) || !markdownRE.test(code)) return code;
      const mdList = code.match(markdownRE);

      const filePathRE = /(?<=file=("|')).*(?=('|"))/;

      mdList?.forEach((md) => {
        // 匹配 markdown 文件目录
        const fileRelativePaths = md.match(filePathRE);
        if (!fileRelativePaths?.length) return;

        // markdown 文件的相对路径
        const fileRelativePath = fileRelativePaths![0];
        // 找到当前 vue 的目录
        const fileDir = path.dirname(id);
        // 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
        const filePath = path.resolve(fileDir, fileRelativePath);
        // 读取 markdown 文件的内容
        const mdText = fs.readFileSync(filePath, "utf-8");

        // 将 g-markdown 标签替换成转换后的 html 文本
        // transformCode = transformCode.replace(md, transformMarkdown(mdText));

        // 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
        const mdFilePath = path.resolve(fileDir, fileRelativePath);
        // 记录引入当前 md 文件的 vue 文件 id
        mdRelationMap.set(mdFilePath, id);
      });
    },
    // 热重载钩子
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx;

      // 过滤非 md 文件
      if (path.extname(file) !== ".md") return;

      // 找到引入该 md 文件的 vue 文件
      const relationId = mdRelationMap.get(file) as string;
      // 找到该 vue 文件的 moduleNode
      const relationModule = [
        ...server.moduleGraph.getModulesByFile(relationId)!,
      ][0];
      // 发送 websocket 消息，进行单文件热重载
      server.ws.send({
        type: "update",
        updates: [
          {
            type: "js-update",
            path: relationModule.file!,
            acceptedPath: relationModule.file!,
            timestamp: new Date().getTime(),
          },
        ],
      });

      // 指定需要重新编译的模块
      return [...modules, relationModule];
    },
  };
}
export default markdownPlugin;
