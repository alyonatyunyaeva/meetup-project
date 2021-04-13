<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove(index)">
      <app-icon icon="trash" />
    </button>

    <div class="form-group">
      <select title="Тип" v-model="type">
        <option v-for="(value, key) in agendaTitles" :value="key" :key="key">{{
          value
        }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model.lazy="startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            v-model.lazy="endsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Заголовок</label>
      <input class="form-control" v-model.lazy="title" />
    </div>
    <div class="form-group">
      <label class="form-label">Описание</label>
      <textarea v-model.lazy="description" class="form-control"></textarea>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon";
import { agendaItemTitles } from "@/utils/data.js";
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
  },

  computed: {
    ...mapGetters({
      meetup: "meetup/meetup",
    }),
    agendaItem() {
      return this.meetup.agenda[this.index];
    },
    agendaTitles() {
      return agendaItemTitles;
    },
    startsAt: mapField("startsAt"),
    endsAt: mapField("endsAt"),
    type: mapField("type"),
    title: mapField("title"),
    description: mapField("description"),
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

<style src="./AgendaItemForm.css" lang="css" scoped></style>
