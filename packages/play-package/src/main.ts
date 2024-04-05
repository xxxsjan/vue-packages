import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import IpInput from "vue-ip-address-input";
import ScreenContainer from "screen-container";

const app = createApp(App);

app.use(IpInput);
app.use(ScreenContainer);

app.mount("#app");
