<template>
  <div>
    <MeetupView
      @changeParticipaTion="getMeetup"
      v-if="meetup"
      :meetup="meetup"
    />
  </div>
</template>

<script>
import MeetupView from "@/components/Meetup/MeetupView/MeetupView";
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
  methods: {
    async getMeetup() {
      this.meetup = await meetupApi.fetchMeetup(this.meetupId);
    },
  },

  mounted() {
    this.getMeetup();
  },
};
</script>

<style></style>
