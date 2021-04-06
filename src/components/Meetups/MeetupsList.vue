<template>
  <div class="meetups-list fade-list">
    <meetup-list-item
      v-for="meetup in meetups"
      :meetup="meetup"
      :key="meetup.id"
      @open="handlerClickMeetup(meetup.id)"
    />
  </div>
</template>

<script>
import MeetupListItem from "../Meetups/MeetupsListItem.vue";

export default {
  name: "MeetupsList",

  components: {
    MeetupListItem,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    handlerClickMeetup(id) {
      this.$router.push({ name: "meetup", params: { meetupId: id } });
    },
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
  cursor: pointer;
}

.fade-list > * {
  transition: all 0.3s ease-out;
}

.fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
}

.fade-list-move {
  transition: transform 0.3s;
}
</style>
