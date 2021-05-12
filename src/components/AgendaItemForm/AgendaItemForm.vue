<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove(index)">
      <app-icon icon="trash" />
    </button>

    <div class="form-group">
      <FormLabel>Тип</FormLabel>

      <select title="Тип" v-model="type" class="select">
        <option v-for="(value, key) in agendaTitles" :value="key" :key="key">{{
          value
        }}</option>
      </select>
    </div>
    <div class="form-group" v-if="type === 'talk'">
      <FormLabel>Язык доклада</FormLabel>

      <select title="Язык" v-model="language" class="select">
        <option
          v-for="language in languages"
          :value="language.value"
          :key="language.value"
          >{{ language.title }}</option
        >
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <Input
          label="Начало"
          type="time"
          placeholder="00:00"
          v-model.lazy="startsAt"
        />
      </div>
      <div class="form__col">
        <Input
          label="Окончание"
          v-model.lazy="endsAt"
          type="time"
          placeholder="00:00"
        />
      </div>
    </div>

    <Input label="Заголовок" v-model.lazy="title" />

    <Input label="Описание" v-model.lazy="description" textarea />

    <Input label="Докладчик" v-if="type === 'talk'" v-model.lazy="speaker" />
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon/AppIcon";
import Input from "@/components/Input/Input";
import FormLabel from "@/components/FormLabel/FormLabel";

import { agendaItemTitles } from "@/utils/data.js";
import { languages } from "@/utils/data.js";
import { mapGetters, mapActions } from "vuex";

const mapField = (field) => ({
  get() {
    return this.agendaItem[field];
  },
  set(value) {
    this.setAgendaItemField({ index: this.index, field: field, value });
  },
});
export default {
  name: "AgendaItemForm",

  props: {
    index: {
      type: Number,
      required: true,
    },
  },

  components: {
    AppIcon,
    FormLabel,
    Input,
  },

  computed: {
    ...mapGetters({
      meetup: "meetup/meetup",
    }),
    languages() {
      this.agendaItem.language = "RU";
      return languages;
    },
    agendaItem() {
      return this.meetup.agenda[this.index];
    },
    agendaTitles() {
      return agendaItemTitles;
    },
    language: mapField("language"),
    startsAt: mapField("startsAt"),
    endsAt: mapField("endsAt"),
    type: mapField("type"),
    title: mapField("title"),
    description: mapField("description"),
    speaker: mapField("speaker"),
  },
  methods: {
    ...mapActions({
      setAgendaItemField: "meetup/setAgendaItemField",
      removeAgendaItem: "meetup/removeAgendaItem",
    }),
    remove(index) {
      this.removeAgendaItem(index);
    },
  },
};
</script>

<style src="./AgendaItemForm.scss" lang="scss" scoped></style>
