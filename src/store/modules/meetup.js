import { meetupApi } from "@/api";

const initialState = () => ({
  profile: initialProfile(),
  meetup: null,
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
  setMeetup: ({ commit }, meetup) => {
    commit("_setMeetup", meetup);
  },
  setMeetupField({ commit }, opts) {
    commit("_setMeetupField", opts);
  },
  pushAgendaItem({ commit }, opts) {
    commit("_pushAgendaItem", opts);
  },
  setAgendaItemField({ commit }, opts) {
    commit("_setAgendaItemField", opts);
  },
  removeAgendaItem({ commit }, opts) {
    commit("_removeAgendaItem", opts);
  },
  removeMeetup({ commit }) {
    commit("_flushMeetup");
  },
  uploadImg: async ({ commit }, opts) => {
    const { file } = opts;
    try {
      const result = await meetupApi.uploadImg({ file });
      commit("_uploadImg", result.id);
    } catch (err) {
      console.log(err);
    }
  },
  setProfile: ({ commit }, opts) => {
    commit("_setProfile", opts);
  },

  flush: ({ commit }) => {
    commit("_flush");
  },
};

const mutations = {
  _setMeetup: (state, meetup) => {
    state.meetup = meetup;
  },
  _setMeetupField(state, { field, value }) {
    state.meetup[field] = value;
  },
  _pushAgendaItem(state, newAgendaItem) {
    state.meetup.agenda.push(newAgendaItem);
  },
  _setAgendaItemField(state, { index, field, value }) {
    state.meetup.agenda[index][field] = value;
  },
  _removeAgendaItem(state, index) {
    state.meetup.agenda.splice(index, 1);
  },
  _flushMeetup: (state) => {
    state.meetup = null;
  },
  _setProfile: (state, opts = {}) => {
    state.profile = opts;
  },
  _flush: (state) => {
    Object.assign(state, initialState());
  },
  _uploadImg: (state, id) => {
    state.meetup.imageId = id;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
