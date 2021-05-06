<template>
  <div>
    <MeetupCover :title="meetup.title" :link="link" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <MeetupDescription :description="meetup.description" />
          <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
        </div>
        <MeetupInfo
          :organizer="meetup.organizer"
          :place="meetup.place"
          :date="date"
        />
        <div v-if="meetup.organizing">
          <button class="button button_primary" @click="onEdit">
            Редактировать
          </button>
          <button class="button button_danger">Удалить</button>
        </div>
        <div v-else-if="meetup.attending">
          <button
            class="button button_primary"
            @click="onChangeParticipaTion('DELETE')"
          >
            Отменить участие
          </button>
        </div>
        <div v-else-if="!meetup.attending">
          <button
            class="button button_primary"
            @click="onChangeParticipaTion('PUT')"
          >
            Принять участие
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "./MeetupCover.vue";
import MeetupDescription from "./MeetupDescription.vue";
import MeetupAgenda from "./MeetupAgenda.vue";
import MeetupInfo from "./MeetupInfo.vue";
import { getMeetupCoverLink } from "@/utils/data.js";
import { mapActions } from "vuex";
import { meetupApi } from "@/api";

export default {
  name: "MeetupView",

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return this.meetup?.imageId ? getMeetupCoverLink(this.meetup) : "";
    },
    date() {
      return new Date(this.meetup.date);
    },
  },
  methods: {
    ...mapActions({
      setMeetup: "meetup/setMeetup",
    }),
    onEdit() {
      this.setMeetup({ ...this.meetup, date: this.date });
      this.$router.push({ name: "form" });
    },
    async onChangeParticipaTion(method) {
      await meetupApi.changeParticipation(this.meetup.id, method);
      this.$emit("changeParticipaTion");
    },
  },
};
</script>

<style>
.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}
.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
}

.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
  color: var(--blue);
}

.button.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button.button_danger:hover {
  border-color: var(--red-light);
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }
}
</style>
