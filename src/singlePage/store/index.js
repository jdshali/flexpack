import Vue from "vue";
import Vuex from "vuex";

// import state from "./state.js";
import userCenter from "./modules/userCenter.js";

Vue.use(Vuex);

/* eslint-disable new-cap */
export default new Vuex.Store({
  modules: {
    userCenter
  }
});
