import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const compoA = () =>
  import(/* webpackChunkName: "compoA" */ "../components/compoA.vue");

const compoB = () =>
  import(/* webpackChunkName: "compoB" */ "../components/compoB.vue");

const compoC = () =>
  import(/* webpackChunkName: "compoC" */ "../components/compoC.vue");

// console.log("compoC", compoC);

// import("../components/compoC.vue").then(Text => {
//   console.log(Text);
// });

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "PageA",
      component: compoA,
      meta: {
        deepth: 0.5,
        keepAlive: false
      }
    },
    {
      path: "/pageB",
      name: "PageB",
      component: compoB,
      meta: {
        deepth: 1,
        keepAlive: true
      }
    },
    {
      path: "/pageC",
      name: "PageC",
      component: compoC,
      meta: {
        deepth: 1,
        keepAlive: false
      }
    }
  ]
});
