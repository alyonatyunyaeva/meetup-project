import Vue from "vue";
import Vuex from "vuex";
import meetup from "./modules/meetup";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    meetup,
  },
});
