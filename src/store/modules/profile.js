// import { meetupApi } from "@/api";

const initialState = () => ({
  profile: initialProfile(),
});

const initialProfile = () => ({
  avatar: "",
  email: "",
  fullname: "",
  id: null,
});

const state = initialState();

const getters = {
  profile: (state) => state.profile,
};

const actions = {
  setProfile: ({ commit }, opts) => {
    commit("_setProfile", opts);
  },

  flush: ({ commit }) => {
    commit("_flush");
  },
};

const mutations = {
  _setProfile: (state, opts = {}) => {
    state.profile = opts;
  },
  _flush: (state) => {
    Object.assign(state, initialState());
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
