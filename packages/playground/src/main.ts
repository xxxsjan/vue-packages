import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import IpInput from "vue-ip-address-input";
import AutoScalingContainer from "vue-autoscaling-container";

const app = createApp(App);

app.use(IpInput);
app.use(AutoScalingContainer);

app.mount("#app");
