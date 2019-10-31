<template>
    <div @click="changeTitle">
        Hello world {{title}}

        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            //logo: logo
        };
    },
    computed: mapState({
        title: state => state.userCenter.title
    }),
    created() {
        //console.log(sayBye());
        this.getPageTitleFromInterface();
        console.log(this.$store.getters.title);
    },
    methods:{
        changeTitle() {
            this.$store.commit('setPageTitle', 'a new title')
        },
        getPageTitleFromInterface() {
            this.$store.dispatch('getPageTitleFromInterface');
        }
    }
};

</script>

<style>
 div {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
</style>
