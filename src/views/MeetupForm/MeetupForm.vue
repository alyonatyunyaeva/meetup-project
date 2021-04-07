<template>
  <form-layout title="Создание митапа">
    <form class="form meetup-form" @submit="sendForm">
      <div class="meetup-form__content">
        <fieldset class="form-section">
          <div class="form-group">
            <label class="form-label">Название</label>
            <!-- <input class="form-control" v-model="meetup.title" /> -->
            <input
              class="form-control"
              @input="setTitleInput"
              v-model="localMeetup.title"
            />
            {{ meetup.title }}
          </div>
          <div class="form-group">
            <label class="form-label">Дата</label>
            <input
              class="form-control"
              type="date"
              v-model="localMeetup.date"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Место проведения</label>
            <input class="form-control" v-model="localMeetup.place" />
          </div>
          <div class="form-group">
            <label class="form-label">Описание</label>
            <textarea
              class="form-control"
              style="min-height:200px"
              v-model="localMeetup.description"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Изображение</label>
            <input
              class="form-control"
              @change="onUploadImage"
              style="min-height:200px"
              type="file"
            />
          </div>
        </fieldset>

        <h3 class="form__section-title">Программа</h3>
        <AgendaItemForm
          v-for="(agendaItem, idx) in localMeetup.agenda"
          :key="agendaItem.id"
          :agenda-item="agendaItem"
          @remove="removeAgendaItem(idx)"
          class="mb-3"
        />

        <div class="form-section_append">
          <button type="button" @click="addAgendaItem">
            + Добавить пункт программы
          </button>
        </div>
      </div>

      <div class="meetup-form__aside">
        <div class="meetup-form__aside_stick">
          <button type="button" class="button button_secondary button_block">
            Cancel
          </button>
          <button class="button button_primary button_block" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  </form-layout>
</template>

<script>
import FormLayout from "@/components/FormLayout";
import AgendaItemForm from "@/components/AgendaItemForm/AgendaItemForm";

import { mapGetters, mapActions } from "vuex";
import { meetupApi } from "@/api";

function createAgendaItem() {
  return {
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function createMeetup() {
  return {
    title: "",
    description: "",
    imageId: null,
    date: null,
    place: "",
    agenda: [],
  };
}

export default {
  name: "MeetupForm",

  components: {
    FormLayout,
    AgendaItemForm,
  },
  data() {
    return {
      localMeetup: createMeetup(),
      imageFile: null,
    };
  },

  computed: {
    ...mapGetters({
      meetup: "meetup/meetup",
    }),
  },

  methods: {
    ...mapActions({
      setTitle: "meetup/setTitle",
    }),

    setTitleInput(e) {
      this.setTitle(e.target.value);
    },

    addAgendaItem() {
      const newItem = createAgendaItem();
      this.localMeetup.agenda.push(newItem);
    },

    removeAgendaItem(idx) {
      this.meetup.agenda.splice(idx, 1);
    },
    sendForm(e) {
      e.preventDefault();
      // this.localMeetup
    },
    async onUploadImage(e) {
      const [file] = e.target.files;
      this.imageFile = file;
      try {
        await meetupApi.uploadImg({ file });
        console.log("Успех");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped src="./MeetupForm.css" lang="css"></style>
