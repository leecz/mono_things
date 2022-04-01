import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
// import ElementPlus from "element-plus";
import "./assets/style/index.css"
// import "element-plus/dist/index.css";
// import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
// app.use(ElementPlus, { size: "small", locale: zhCn });
app.use(router);
app.mount("#app");
