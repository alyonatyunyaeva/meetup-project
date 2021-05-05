<template>
  <div>
    <MeetupView v-if="meetup" :meetup="meetup" />
  </div>
</template>

<script>
import MeetupView from "@/components/Meetup/MeetupView.vue";
import { meetupApi } from "@/api";

export default {
  name: "MeetupPage",

  components: {
    MeetupView,
  },
  data() {
    return {
      meetup: null,
      meetupId: this.$route.params.meetupId,
    };
  },

  async mounted() {
    this.meetup = await meetupApi.fetchMeetup(this.meetupId);
  },
};
</script>

<style></style>
