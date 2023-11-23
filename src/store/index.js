import { createStore } from "vuex";

export default createStore({
  state: {
    meta: {
      title: "",
      child: false,
    },
  },
  mutations: {
    SET_META(state, payload) {
      state.meta = payload;
    },
  },

  actions: {
    async meta({ commit }, message) {
      commit("SET_META", message);
    },
  },
});
