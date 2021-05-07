<template>
  <div v-if="meetup">
    <form-layout title="Создание митапа">
      <form class="form meetup-form" @submit="sendForm">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <Input
              label="Название"
              v-model="title"
              :showError="!$v.title.required && submited"
            />
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
            <Input
              label="Место проведения"
              v-model="place"
              :showError="!$v.place.required && submited"
            />
            <Input
              label="Описание"
              v-model="description"
              :showError="!$v.description.required && submited"
              textarea
            />
            <div class="form-group">
              <label class="form-label">Изображение</label>
              <input
                ref="file"
                class="form-control"
                @change="onUploadImage()"
                type="file"
                accept="image/*"
              />
              <img v-bind:src="image" v-show="showPreview" class="preview" />
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
  },
  data() {
    return {
      rawImage: null,
      image: null,
      showPreview: false,
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
        console.log("title1");
        return this.meetup?.title;
      },
      set(value) {
        console.log("title2");

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
      let file = this.rawImage;
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
    onUploadImage() {
      this.rawImage = this.$refs.file.files[0];

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.image = reader.result;
        }.bind(this),
        false
      );

      if (this.rawImage) {
        if (/\.(jpe?g|png|gif)$/i.test(this.rawImage.name)) {
          reader.readAsDataURL(this.rawImage);
        }
      }
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
