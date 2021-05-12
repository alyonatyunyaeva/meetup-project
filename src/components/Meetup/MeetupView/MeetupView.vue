<template>
  <div>
    <MeetupCover :title="meetup.title" :link="link" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <MeetupDescription :description="meetup.description" />
          <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
          <p v-if="!meetup.agenda.length">
            Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь
            появится!
          </p>
        </div>

        <div class="meetup__aside ">
          <MeetupInfo
            :organizer="meetup.organizer"
            :place="meetup.place"
            :date="date"
          />
          <div class="meetup__aside-buttons">
            <div v-if="meetup.organizing">
              <Button @click="onEdit" primary>Редактировать</Button>
              <Button @click="onDelete" danger>Удалить</Button>
            </div>
            <div v-else-if="meetup.attending">
              <Button @click="onChangeParticipaTion('DELETE')" primary
                >Отменить участие</Button
              >
            </div>
            <div v-else-if="!meetup.attending">
              <Button primary @click="onChangeParticipaTion('PUT')">
                Принять участие
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "../MeetupCover.vue";
import MeetupDescription from "../MeetupDescription.vue";
import MeetupAgenda from "../MeetupAgenda.vue";
import MeetupInfo from "../MeetupInfo.vue";
import Button from "@/components/Button/Button";

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
    Button,
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
      deleteMeetup: "meetup/deleteMeetup",
    }),
    onEdit() {
      this.setMeetup({ ...this.meetup, date: this.date });
      this.$router.push({ name: "form" });
    },
    async onChangeParticipaTion(method) {
      await meetupApi.changeParticipation(this.meetup.id, method);
      this.$emit("changeParticipaTion");
    },
    onDelete() {
      this.deleteMeetup(this.meetup.id);
      this.$router.push({ name: "meetups" });
    },
  },
};
</script>

<style src="./MeetupView.scss" lang="scss" scoped></style>
