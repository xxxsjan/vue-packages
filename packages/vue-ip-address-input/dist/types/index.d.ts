import { Plugin } from "vue";
import "./style/index.scss";
export type ComponentWithInstall<T> = T & Plugin;
export declare function withInstall<T>(comp: T): ComponentWithInstall<T>;
declare const plugin: Plugin;
export default plugin;
