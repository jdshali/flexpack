import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const compoA = () =>
  import(/* webpackChunkName: "compoA" */ "../components/compoA.vue");

const compoB = () =>
  import(/* webpackChunkName: "compoB" */ "../components/compoB.vue");

const compoC = () =>
  import(/* webpackChunkName: "compoC" */ "../components/compoC.vue");

const compoD = import("../components/compoD.vue");

// console.log("compoC", compoC);

// import("../components/compoC.vue").then(Text => {
//   console.log(Text);
// });
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "PageA",
      component: compoA,
      meta: {
        deepth: 0.5,
        keepAlive: false
      },
      beforeEnter: (to, from, next) => {
        // 路由独享的守卫
        console.info("路由独享的守卫:beforeEnter", to, from);
        next();
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
    },
    {
      path: "/pageD",
      name: "PageD",
      component: compoD,
      meta: {
        deepth: 1,
        keepAlive: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 全局前置守卫
  console.info("全局前置守卫:beforeEach", to, from);
  next();
});

router.beforeResolve((to, from, next) => {
  // 解析守卫
  console.info("解析守卫:beforeEach", to, from);
  next();
});

router.afterEach((to, from) => {
  // 全局后置钩子
  console.info("全局后置钩子:afterEach", to, from);
});

export default router;
