<template>
  <div v-if="meetup">
    <form-layout title="Создание митапа">
      <form class="form meetup-form" @submit="sendForm">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <div class="form-group">
              <label class="form-label">Название</label>
              <input class="form-control" v-model.lazy="title" />
            </div>
            <div class="form-group">
              <label class="form-label">Дата</label>
              <input class="form-control" type="date" v-model.lazy="date" />
            </div>
            <div class="form-group">
              <label class="form-label">Место проведения</label>
              <input class="form-control" v-model.lazy="place" />
            </div>
            <div class="form-group">
              <label class="form-label">Описание</label>
              <textarea
                class="form-control"
                style="min-height:200px"
                v-model.lazy="description"
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
            v-for="(agendaItem, index) in meetup.agenda"
            :key="agendaItem.id"
            :index="index"
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
  </div>
</template>

<script>
import FormLayout from "@/components/FormLayout";
import AgendaItemForm from "@/components/AgendaItemForm/AgendaItemForm";

import { mapGetters, mapActions } from "vuex";
// import { meetupApi } from "@/api";

function createAgendaItem() {
  return {
    id: null,
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
    id: null,
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
      imageFile: null,
    };
  },

  computed: {
    ...mapGetters({
      meetup: "meetup/meetup",
    }),

    title: {
      get() {
        return this.meetup.title;
      },
      set(value) {
        this.setMeetupField({ field: "title", value });
      },
    },
    date: {
      get() {
        return this.meetup.date;
      },
      set(value) {
        this.setMeetupField({ field: "date", value });
      },
    },
    place: {
      get() {
        return this.meetup.place;
      },
      set(value) {
        this.setMeetupField({ field: "place", value });
      },
    },
    description: {
      get() {
        return this.meetup.description;
      },
      set(value) {
        this.setMeetupField({ field: "description", value });
      },
    },
  },

  methods: {
    ...mapActions({
      setMeetup: "meetup/setMeetup",
      setMeetupField: "meetup/setMeetupField",
      pushAgendaItem: "meetup/pushAgendaItem",
      removeMeetup: "meetup/removeMeetup",
      uploadImg: "meetup/uploadImg",
    }),

    addAgendaItem() {
      this.pushAgendaItem(createAgendaItem());
    },

    sendForm(e) {
      e.preventDefault();
    },
    async onUploadImage(e) {
      const [file] = e.target.files;
      this.imageFile = file;
      await this.uploadImg({ file });
    },
  },
  created() {
    const payload = createMeetup();
    this.setMeetup(payload);
  },
};
</script>

<style scoped src="./MeetupForm.css" lang="css"></style>
