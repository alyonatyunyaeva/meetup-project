import Vue from "vue";
import Vuex from "vuex";
import meetup from "./modules/meetup";
import profile from "./modules/profile";
import meetupsList from "./modules/meetupsList";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    meetup,
    profile,
    meetupsList,
  },
});
