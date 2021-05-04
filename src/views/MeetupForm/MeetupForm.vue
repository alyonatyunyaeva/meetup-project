<template>
  <div v-if="meetup">
    <form-layout title="Создание митапа">
      <form class="form meetup-form" @submit="sendForm">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <div class="form-group">
              <label class="form-label">Название</label>
              <input class="form-control" v-model.lazy="$v.title.$model" />
              <div style="color: red" v-show="!$v.title.required && submited">
                Поле обязательно
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Дата</label>
              <input class="form-control" type="date" v-model.lazy="date" />
              <div style="color: red" v-if="!$v.date.required && submited">
                Поле обязательно
              </div>
              <div
                style="color: red"
                v-if="$v.date.required && !$v.date.minValue"
              >
                Неверная дата
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Место проведения</label>
              <input class="form-control" v-model.lazy="place" />
              <div style="color: red" v-if="!$v.place.required && submited">
                Поле обязательно
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Описание</label>
              <textarea
                class="form-control"
                style="min-height:200px"
                v-model.lazy="description"
              />
              <div
                style="color: red"
                v-if="!$v.description.required && submited"
              >
                Поле обязательно
              </div>
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
import { required } from "vuelidate/lib/validators";
import { format } from "date-fns";
import { mapGetters, mapActions } from "vuex";

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
      const result = await this.createMeetup();
      if (result.message) {
        alert(result.message);
        return;
      }

      this.$router.push({ name: "meetup", params: { meetupId: result.id } });
      this.flushMeetup();
    },
    async onUploadImage(e) {
      const [file] = e.target.files;
      this.imageFile = file;
      await this.uploadImg({ file });
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
