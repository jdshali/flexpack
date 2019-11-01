<template>
    <div @click="changeTitle">
        Hello world {{title}}
        <keep-alive :include="include">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <router-link to="/">Go to pageA</router-link>
        <router-link to="/pageB">Go to pageB</router-link>
        <router-link to="/pageC">Go to pageC</router-link>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      include: []
    };
  },
  computed: mapState({
    title: state => state.userCenter.title
  }),
  watch: {
    $route(to, from) {
      console.log(to, from);
      // 如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }

      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        // 此时是从需要缓存的页面后退到父页面，将该页面的缓存去掉
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },
  created() {
    //console.log(sayBye());
    this.getPageTitleFromInterface();
    console.log(this.$store.getters.title);
  },
  methods: {
    changeTitle() {
      this.$store.commit("setPageTitle", "a new title");
    },
    getPageTitleFromInterface() {
      this.$store.dispatch("getPageTitleFromInterface");
    }
  }
};
</script>

<style>
div {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
</style>
