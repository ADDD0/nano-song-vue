import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Search,
  Image,
  List,
  Cell,
  Tag,
  Sticky,
  Uploader,
  Form,
  Field,
  Calendar,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
} from "vant";
import { Toast } from "vant";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(Button)
  .use(Search)
  .use(Image)
  .use(List)
  .use(Cell)
  .use(Tag)
  .use(Sticky)
  .use(Uploader)
  .use(Form)
  .use(Field)
  .use(Calendar)
  .use(Col)
  .use(Row)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Toast)
  .mount("#app");

import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "localhost:8081";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;
axios.defaults.baseURL = "/api"; // api 即 vue.config.js 中配置的地址

app.config.globalProperties.$axios = axios;

export { axios };
