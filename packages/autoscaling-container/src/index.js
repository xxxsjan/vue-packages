import AutoScalingContainer from "./autoscaling-container.vue";

const plugin = {
  install(app) {
    app.component("AutoScalingContainer", AutoScalingContainer);
  },
};

// export function withInstall(comp) {
//   comp.install = (app) => {
//     const { name } = comp;
//     app.component(name, comp); // 将组件注册成全局的组件
//   };
//   return comp;
// }

// const plugin = withInstall(IpInput);

export default plugin;
