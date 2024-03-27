import { App, Plugin } from "vue";
import IpInput from "./index.vue";
import "./index.scss";

export type ComponentWithInstall<T> = T & Plugin;
export function withInstall<T>(comp: T) {
  (comp as ComponentWithInstall<T>).install = (app) => {
    const { name } = comp as { name: string };
    app.component(name, comp as ComponentWithInstall<T>); // 将组件注册成全局的组件
  };
  return comp as ComponentWithInstall<T>;
}

const plugin: Plugin = {
  install(app) {
    app.component("ip-input", IpInput);
  },
};

// const plugin = withInstall(IpInput);

export default plugin;
