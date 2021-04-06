<template>
  <div class="meetups-list__item" @click="$emit('open', $event.target.id)">
    <div class="meetups-list__col">
      <div class="meetups-list__cover" :style="coverStyle">
        <h5>{{ meetup.title }}</h5>
      </div>
    </div>
    <div class="meetups-list__col">
      <div class="meetups-list__description">
        <span
          v-if="meetup.attending"
          class="meetups-list__badge meetups-list__badge_success"
          >Участвую</span
        >
        <span v-else-if="meetup.organizing" class="meetups-list__badge"
          >Организую</span
        >
        <ul class="info-list">
          <li>
            <img
              class="icon info-list__icon"
              alt="icon"
              src="@/assets/icons/icon-user.svg"
            />
            {{ meetup.organizer }}
          </li>
          <li>
            <img
              class="icon info-list__icon"
              alt="icon"
              src="@/assets/icons/icon-map.svg"
            />
            {{ meetup.place }}
          </li>
          <li>
            <img
              class="icon info-list__icon"
              alt="icon"
              src="@/assets/icons/icon-cal-lg.svg"
            />
            <time :datetime="meetup.dateOnlyString">{{
              meetup.localDate
            }}</time>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = "https://course-vue.javascript.ru/api";
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

export default {
  name: "MeetupListItem",

  props: {
    meetup: {
      required: true,
      type: Object
    }
  },
  computed: {
    link() {
      return this.meetup?.imageId ? getMeetupCoverLink(this.meetup) : "";
    },
    coverStyle() {
      console.log("this.link", this.link);
      return this.link ? { "--bg-url": `url('${this.link}')` } : {};
    }
  }
};
</script>

<style scoped>
.meetups-list {
}

.meetups-list__item {
  text-decoration: none;
  color: inherit;
  position: relative;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: row;
  background-color: var(--white);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  transition: box-shadow ease 0.2s;
}

.meetups-list__item:hover {
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.24);
}

.meetups-list__item > .meetups-list__col {
  flex: 1 0 50%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.meetups-list__cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-url);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 40px;
  line-height: 44px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  color: var(--white);
  overflow: hidden;
  position: relative;
  min-height: 218px;
}

.meetups-list__description {
  padding: 50px;
  border-left: 5px solid var(--blue);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.meetups-list__badge {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: var(--blue);
  display: flex;
  flex-direction: row;
  padding: 4px 12px;
  background-color: var(--blue-extra);
}

.meetups-list__badge.meetups-list__badge_success {
  color: var(--green);
  background-color: var(--green-light);
}

.info-list {
  margin: 0;
  padding: 0;
}

.info-list li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.info-list li:last-child {
  margin: 0;
}

.info-list__icon {
  position: absolute;
  left: 0;
  top: 0;
}

@media all and (max-width: 992px) {
  .meetups-list__item {
    flex-direction: column;
  }

  .meetups-list__item > .meetups-list__col {
    flex: 1 0 100%;
  }

  .meetups-list__description {
    padding: 40px 24px 32px;
  }
}
</style>
