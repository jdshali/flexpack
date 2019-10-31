// import api from '../../api/test'; 接口

// initial state
const state = {
  title: "首页"
};

// getters

const getters = {
  title: state => {
    return state.title;
  }
};

// actions

const actions = {
  getPageTitleFromInterface({ commit }) {
    // setTimeout(() => {
    commit("setPageTitle", "I am from interface");
    // }, 3000);
  }
};

// mutations

const mutations = {
  setPageTitle(state, title) {
    state.title = title;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
