import { createApp } from "vue";
import App from "./app.vue";
import wsIcon from "@wsui-plus/components/Icon"
import "@wsui-plus/theme/src/index.scss"
const app = createApp(App);

app.use(wsIcon)
app.mount("#app");
