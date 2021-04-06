<template>
  <div>
    <MeetupView v-if="meetup" :meetup="meetup" />
  </div>
</template>

<script>
import MeetupView from "@/components/Meetup/MeetupView.vue";
import { fetchMeetup } from "@/utils/data.js";

export default {
  name: "MeetupPage",

  components: {
    MeetupView
  },
  data() {
    return {
      meetup: null,
      meetupId: this.$route.params.meetupId,
    };
  },

  async mounted() {
    this.meetup = await fetchMeetup(this.meetupId);
  }
};
</script>

<style></style>
