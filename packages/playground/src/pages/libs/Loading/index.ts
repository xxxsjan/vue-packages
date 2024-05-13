import Loading from './index.vue';
import { App, createVNode, render } from 'vue';
export default {
  install(app: App) {
    const vNode = createVNode(Loading);
    console.log(vNode);
    render(vNode, document.body);
    app.config.globalProperties.$loading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide,
    };
    app.config.globalProperties.$loading.show();
    setTimeout(() => {
      // app.config.globalProperties.$loading.hide();
    }, 2000);
  },
};
