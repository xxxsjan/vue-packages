import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import IpInput from "vue-ip-address-input";
const app = createApp(App);

app.use(IpInput);

app.mount("#app");
