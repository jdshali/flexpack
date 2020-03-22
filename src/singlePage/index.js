import Vue from "vue";

import router from "./router";
import store from "./store/index.js";
import App from "./App.vue";

// import("./text.js").then(Text => {
//   console.log(Text);
// });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
