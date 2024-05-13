import type { Component, App } from "vue";
import TableCanDbEdit from "./TableCanDbEdit.vue";
import MyButton from "./MyButton/index.vue";
import ActionSheet from "./ActionSheet/ActionSheet.vue";
import Magnifier from "./Magnifier.vue";

import XLink from "./link/src/link.vue";

const components: {
  [propName: string]: Component;
} = {
  TableCanDbEdit,
  MyButton,
  ActionSheet,
  Magnifier,

  XLink,
};

export default {
  install: (app: App) => {
    for (const key in components) {
      app.component(key, components[key]);
    }
  },
};
