<template>
  <div class="meetup-agenda">
    <p class="meetup-agenda__empty" v-if="!agenda.length">
      Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь
      появится!
    </p>
    <MeetupAgendaItem
      v-for="agendaItem in agenda"
      :agendaItem="agendaItem"
      :key="agendaItem.id"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "./MeetupAgendaItem.vue";

export default {
  name: "MeetupAgenda",

  components: {
    MeetupAgendaItem
  },

  props: {
    agenda: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.meetup-agenda {
  margin: 0;
}
</style>
