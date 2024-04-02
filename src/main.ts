import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
// import orgApi from "./api/org";
// import userApi from "./api/user";
import "./style.css";
import "element-plus/dist/index.css";

import axios from 'axios'
import mitt from 'mitt';


// 创建 mitt 实例
const emitter = mitt();


// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <h1>Hixtrip FE Online Quiz</h1>
//     <h2>Users:<h2>
//     <p class="read-the-docs" id="user">
//     </p>
//     <h2>Orgs:<h2>
//     <p class="read-the-docs" id="org">
//     </p>
//   </div>
// `;

// userApi.query({}).then((users) => {
//   document.getElementById("user")!.innerHTML = JSON.stringify(users);
// });

// orgApi.query("1").then((users) => {
//   document.getElementById("org")!.innerHTML = JSON.stringify(users);
// });

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$http = axios
app.config.globalProperties.$Bus = emitter
app.mount('#app')
