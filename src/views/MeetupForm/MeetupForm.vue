<template>
  <div v-if="meetup">
    <form-layout title="Создание митапа">
      <form class="form meetup-form" @submit="sendForm">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <Input
              label="Название"
              v-model.lazy="title"
              :showError="$v.title.$invalid && submited"
            />
            <Input
              label="Дата"
              type="date"
              v-model.lazy="date"
              :showError="$v.date.$invalid && submited"
              :errorText="errorTextDate()"
            />

            <Input
              label="Место проведения"
              v-model.lazy="place"
              :showError="$v.place.$invalid && submited"
            />
            <Input
              label="Описание"
              v-model.lazy="description"
              :showError="$v.description.$invalid && submited"
              textarea
            />

            <ImageUpload @uploaded="onUploaded" :initialImg="link" />
          </fieldset>

          <h3 class="form__section-title">Программа</h3>
          <AgendaItemForm
            v-for="(agendaItem, index) in meetup.agenda"
            :key="agendaItem.id"
            :index="index"
            class="mb-3"
            :submited="submited"
          />

          <div class="form-section_append">
            <button type="button" @click="addAgendaItem">
              + Добавить пункт программы
            </button>
          </div>
        </div>

        <div class="meetup-form__aside">
          <div class="meetup-form__aside_stick">
            <Button @click="onCancel" secondary>Отмена</Button>
            <Button type="submit" primary>Сохранить</Button>
          </div>
        </div>
      </form>
    </form-layout>
  </div>
</template>

<script>
import AgendaItemForm from "@/components/AgendaItemForm/AgendaItemForm";
import FormLayout from "@/components/Layouts/FormLayout";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { required } from "vuelidate/lib/validators";
import { format } from "date-fns";
import { mapGetters, mapActions } from "vuex";
import { getMeetupCoverLink } from "@/utils/data.js";
import { createAgendaItem } from "./data.js";
import { createLocalMeetup } from "./data.js";

export default {
  name: "MeetupForm",

  components: {
    AgendaItemForm,
    FormLayout,
    Input,
    Button,
    ImageUpload,
  },
  data() {
    return {
      image: null,
      submited: false,
    };
  },
  validations: {
    title: {
      required,
    },
    date: {
      required,
      minValue: function(value) {
        return value >= format(new Date(), "yyyy-MM-dd");
      },
    },
    place: {
      required,
    },
    description: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      meetup: "meetup/meetup",
    }),
    link() {
      return this.meetup?.imageId ? getMeetupCoverLink(this.meetup) : "";
    },

    title: {
      get() {
        return this.meetup?.title;
      },
      set(value) {
        this.setMeetupField({ field: "title", value });
      },
    },
    date: {
      get() {
        let formatedDate = null;
        if (this.meetup.date) {
          formatedDate = format(new Date(this.meetup.date), "yyyy-MM-dd");
        }
        return formatedDate;
      },
      set(value) {
        const date = new Date(value).toISOString();
        this.setMeetupField({ field: "date", value: date });
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
      createMeetup: "meetup/createMeetup",
      updateMeetup: "meetup/updateMeetup",
      flushMeetup: "meetup/flush",
    }),
    errorTextDate() {
      if (!this.$v.date.required) {
        return;
      }
      if (!this.$v.date.minValue) {
        return "Неверная дата";
      }
    },
    addAgendaItem() {
      this.pushAgendaItem(createAgendaItem());
    },
    onCancel() {
      this.$router.push({ name: "meetups" });
    },
    isFormCorrect() {
      this.$v.$touch();
      this.submited = true;
      return this.$v.$invalid ? false : true;
    },

    async sendForm(e) {
      e.preventDefault();
      if (!this.isFormCorrect()) {
        return;
      }
      let result;
      if (this.image) {
        let file = this.image;
        await this.uploadImg({ file });
      }
      this.meetup.id
        ? (result = await this.updateMeetup())
        : (result = await this.createMeetup());
      if (result.message) {
        alert(result.message);
        return;
      }

      this.$router.push({ name: "meetup", params: { meetupId: result.id } });
      this.flushMeetup();
    },
    onUploaded(file) {
      this.image = file;
    },
    newMeetup() {
      if (!this.meetup) {
        const payload = createLocalMeetup();
        this.setMeetup(payload);
      }
    },
  },
  created() {
    this.newMeetup();
  },
};
</script>

<style scoped src="./MeetupForm.css" lang="css"></style>
