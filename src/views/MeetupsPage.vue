<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <!-- <form-check v-model="filter.date" :options="$options.dateFilterOptions" name="date" /> -->
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
              v-model="filter.search"
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
      <MeetupsCalendar v-else-if="view === 'calendar'" :meetups="filteredMeetups" />
    </template>
    <div v-else>Митапов по заданным условиям не найдено...</div>
    <!-- <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty> -->
  </div>
</template>

<script>
import MeetupsList from "@/components/Meetups/MeetupsList.vue";
import MeetupsCalendar from '@/components/Meetups/MeetupsCalendar.vue';
import PageTabs from '@/components/Meetups/PageTabs.vue';
// import { FormCheck } from './FormCheck.js';
// import { AppEmpty } from './AppEmpty.js';

const fetchMeetups = () =>
  fetch("https://course-vue.javascript.ru/api/meetups").then(res => res.json());

export default {
  name: "MeetupsPage",
  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" }
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    // FormCheck,
    // AppEmpty,
  },

  data() {
    return {
      rawMeetups: [],
      filter: {
        date: "all",
        participation: "all",
        search: ""
      },
      view: "list"
    };
  },

  async mounted() {
    this.rawMeetups = await fetchMeetups();
  },

  computed: {
    meetups() {
      return this.rawMeetups.map(meetup => ({
        ...meetup,
        cover: meetup.imageId
          ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        dateOnlyString: new Date(meetup.date).toISOString().split("T")[0]
      }));
    },

    filteredMeetups() {
      const dateFilter = meetup =>
        this.filter.date === "all" ||
        (this.filter.date === "past" && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === "future" && new Date(meetup.date) > new Date());

      const participationFilter = meetup =>
        this.filter.participation === "all" ||
        (this.filter.participation === "organizing" && meetup.organizing) ||
        (this.filter.participation === "attending" && meetup.attending);

      const searchFilter = meetup =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter(
        meetup =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup)
      );
    }
  }
};
</script>

<style>
.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}
.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon {
  right: 16px;
}

.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}
.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}
@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
@media all and (max-width: 992px) {
  .container {
    padding: 0 16px;
  }
}
@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
