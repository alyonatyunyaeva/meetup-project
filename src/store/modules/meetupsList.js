import { meetupApi } from "@/api";

const initialState = () => ({
  rawMeetupsList: [],
  meetupsList: [],
  filteredMeetups: [],
  filter: {
    date: "all",
    participation: "all",
    search: "",
  },
});

const state = initialState();

const getters = {
  filteredMeetups: (state) => state.filteredMeetups,
  meetupsList: (state) => state.meetupsList,
  filter: (state) => state.filter,
};

const actions = {
  async getRawMeetups({ commit }) {
    const rawMeetupList = await meetupApi.fetchMeetups();
    commit("_setRawMeetups", rawMeetupList);
    commit("_setMeetupsList");
    commit("_setFilteredMeetups");
  },
  setFilter({ commit }, opts) {
    commit("_setFilter", opts);
    commit("_setFilteredMeetups");
  },
};

const mutations = {
  _setRawMeetups(state, rawMeetupList) {
    state.rawMeetupsList = rawMeetupList;
  },
  _setMeetupsList(state) {
    state.meetupsList = state.rawMeetupsList.map((meetup) => ({
      ...meetup,
      cover: meetup.imageId
        ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
        : undefined,
      date: new Date(meetup.date),
      localDate: new Date(meetup.date).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dateOnlyString: new Date(meetup.date).toISOString().split("T")[0],
    }));
  },
  _setFilteredMeetups(state) {
    const dateFilter = (meetup) =>
      state.filter.date === "all" ||
      (state.filter.date === "past" && new Date(meetup.date) <= new Date()) ||
      (state.filter.date === "future" && new Date(meetup.date) > new Date());

    const participationFilter = (meetup) =>
      state.filter.participation === "all" ||
      (state.filter.participation === "organizing" && meetup.organizing) ||
      (state.filter.participation === "attending" && meetup.attending);

    const searchFilter = (meetup) =>
      [meetup.title, meetup.description, meetup.place, meetup.organizer]
        .join(" ")
        .toLowerCase()
        .includes(state.filter.search.toLowerCase());

    state.filteredMeetups = state.meetupsList.filter(
      (meetup) =>
        dateFilter(meetup) &&
        participationFilter(meetup) &&
        searchFilter(meetup)
    );
  },
  _setFilter(state, opts) {
    const { filter, value } = opts;
    state.filter[filter] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
