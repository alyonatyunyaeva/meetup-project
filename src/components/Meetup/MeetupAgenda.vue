<template>
  <div class="meetup-agenda">
    <MeetupAgendaItem
      v-for="agendaItem in agenda"
      :agendaItem="agendaItem"
      :key="agendaItem.id"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "./MeetupAgendaItem/MeetupAgendaItem";

export default {
  name: "MeetupAgenda",

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.meetup-agenda {
  margin: 0;
}
</style>
