import AutoScalingContainer from "./autoscaling-container.vue";

const plugin = {
  install(app) {
    app.component("AutoScalingContainer", AutoScalingContainer);
  },
};

export default plugin;
