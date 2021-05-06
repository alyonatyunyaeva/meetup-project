<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          v-model="date"
          :options="$options.dateFilterOptions"
          name="date"
        />
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <img class="icon" alt="icon" src="@/assets/icons/icon-search.svg" />
            <input
              ref="input-element"
              id="filters-panel__search"
              class="form-control form-control_rounded form-control_sm"
              type="text"
              v-model="search"
              placeholder="Поиск"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :selected.sync="view" />
        </div>
      </div>
    </div>

    <template v-if="filteredMeetups.length">
      <MeetupsList v-if="view === 'list'" :meetups="filteredMeetups" />
      <MeetupsCalendar
        v-else-if="view === 'calendar'"
        :meetups="filteredMeetups"
      />
    </template>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import MeetupsList from "@/components/Meetups/MeetupsList.vue";
import MeetupsCalendar from "@/components/Meetups/MeetupsCalendar.vue";
import PageTabs from "@/components/Meetups/PageTabs.vue";
import { mapActions, mapGetters } from "vuex";
import FormCheck from "@/components/FormCheck/FormCheck";
import AppEmpty from "@/components/AppEmpty/AppEmpty";

export default {
  name: "MeetupsPage",
  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" },
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
  },
  watch: {
    $route: {
      handler: function() {
        this.checkFilter();
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      view: "list",
    };
  },
  props: {
    participate: Boolean,
    organize: Boolean,
  },
  async mounted() {
    this.checkFilter();
    this.getMeetups();
  },

  computed: {
    ...mapGetters({
      filteredMeetups: "meetupsList/filteredMeetups",
      filter: "meetupsList/filter",
    }),
    search: {
      get() {
        return this.filter?.search;
      },
      set(value) {
        this.setFilter({ filter: "search", value });
      },
    },
    date: {
      get() {
        return this.filter?.date;
      },
      set(value) {
        this.setFilter({ filter: "date", value });
      },
    },
  },
  methods: {
    ...mapActions({
      getMeetups: "meetupsList/getRawMeetups",
      setFilter: "meetupsList/setFilter",
    }),
    checkFilter() {
      let route = this.$route.path;
      if (route.includes("organizing")) {
        this.setFilter({ filter: "participation", value: "organizing" });
        return;
      }
      if (route.includes("attending")) {
        this.setFilter({ filter: "participation", value: "attending" });
        return;
      }
      if (route === "/meetups") {
        this.setFilter({ filter: "participation", value: "all" });
        return;
      }
    },
  },
};
</script>

<style src="./MeetupsPage.css"></style>
