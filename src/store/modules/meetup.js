const initialState = () => ({
  profile: initialProfile(),
  meetup: {
    title: "",
    description: "",
    date: "",
    imageId: null,
    place: "",
    agenda: [
      // {
      //   type: "registration",
      //   language: "RU",
      //   startsAt: "",
      //   endsAt: "",
      //   title: "",
      //   description: "",
      //   speaker: "",
      // },
    ],
  },
});

const initialProfile = () => ({
  avatar: "",
  email: "",
  fullname: "",
  id: null,
});

const state = initialState();

const getters = {
  meetup: (state) => state.meetup,
  profile: (state) => state.profile,
};

const actions = {
  setTitle: ({ commit }, value) => {
    commit("_setTitle", value);
  },
  setProfile: ({ commit }, opts = {}) => {
    commit("_setProfile", opts);
  },
  flush: ({ commit }) => {
    commit("_flush");
  },
};

const mutations = {
  _setTitle: (state, value) => {
    state.meetup.title = value;
  },
  _setProfile: (state, opts = {}) => {
    state.profile = opts;
  },
  _flush: () => {
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
