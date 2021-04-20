<template>
  <div>
    <MeetupCover :title="meetup.title" :link="link" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <MeetupDescription :description="meetup.description" />
          <MeetupAgenda :agenda="meetup.agenda" />
        </div>
        <MeetupInfo
          :organizer="meetup.organizer"
          :place="meetup.place"
          :date="date"
        />
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

export default {
  name: "MeetupView",
  //:coverStyle="coverStyle"

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
@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }
}
</style>
