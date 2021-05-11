<template>
  <div v-if="meetup">
    <form-layout title="Создание митапа">
      <form class="form meetup-form" @submit="sendForm">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <Input
              label="Название"
              v-model.lazy="title"
              :showError="!$v.title.required && submited"
            />
            <Input
              label="Дата"
              type="date"
              v-model.lazy="date"
              :showError="
                (!$v.title.required && submited) ||
                  ($v.date.required && !$v.date.minValue)
              "
              :errorText="!$v.date.minValue ? 'Неверная дата' : ''"
            />
            <div
              style="color: red"
              v-if="$v.date.required && !$v.date.minValue"
            ></div>

            <Input
              label="Место проведения"
              v-model.lazy="place"
              :showError="!$v.place.required && submited"
            />
            <Input
              label="Описание"
              v-model.lazy="description"
              :showError="!$v.description.required && submited"
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
            <button
              type="button"
              class="button button_secondary button_block"
              @click="onCancel"
            >
              Отмена
            </button>
            <button class="button button_primary button_block" type="submit">
              Сохранить
            </button>
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
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { required } from "vuelidate/lib/validators";
import { format } from "date-fns";
import { mapGetters, mapActions } from "vuex";
import { getMeetupCoverLink } from "@/utils/data.js";

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

function createLocalMeetup() {
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
    AgendaItemForm,
    FormLayout,
    Input,
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

    addAgendaItem() {
      this.pushAgendaItem(createAgendaItem());
    },
    onCancel() {
      this.$router.push({ name: "meetups" });
    },

    async sendForm(e) {
      e.preventDefault();
      this.$v.$touch();
      this.submited = true;
      if (this.$v.$invalid) return;
      let result;
      let file = this.image;
      await this.uploadImg({ file });
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
