<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon :icon="icon" />
    </div>
    <div class="meetup-agenda__item-col">
      {{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}
    </div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">{{ title }}</h5>
      <p v-if="agendaItem.type === 'talk'">
        <span>{{ agendaItem.speaker }}</span>
        <span class="meetup-agenda__dot"></span>
        <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
      </p>
      <p>{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<script>
import { agendaItemTitles, agendaItemIcons } from "@/utils/data.js";
import AppIcon from "@/components/AppIcon/AppIcon";

export default {
  name: "MeetupAgendaItem",

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  components: { AppIcon },

  computed: {
    title() {
      return this.agendaItem.title
        ? this.agendaItem.title
        : agendaItemTitles[this.agendaItem.type];
    },
    icon() {
      return agendaItemIcons[this.agendaItem.type];
    },
  },
};
</script>

<style src="./MeetupAgendaItem.scss" lang="scss" scoped></style>
