<template>
  <div class="meetup__aside">
    <ul class="info-list">
      <li>
        <img
          class="icon info-list__icon"
          alt="icon"
          src="@/assets/icons/icon-user.svg"
        />
        {{ organizer }}
      </li>
      <li>
        <img
          class="icon info-list__icon"
          alt="icon"
          src="@/assets/icons/icon-map.svg"
        />
        {{ place }}
      </li>
      <li>
        <img
          class="icon info-list__icon"
          alt="icon"
          src="@/assets/icons/icon-cal-lg.svg"
        />
        <time>{{ localDate }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    organizer: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    localDate() {
      const localDate = new Date(this.date).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric"
        // timezone: 'UTC',
        // hour: 'numeric',
        // minute: 'numeric',
      });
      return localDate;
    }
  }
};
</script>

<style>
.meetup__aside {
  margin: 40px 0;
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

@media all and (min-width: 992px) {
  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
