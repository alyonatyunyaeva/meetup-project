<template>
  <header class="header">
    <div>
      <h1>
        <router-link :to="{ name: 'meetups' }">
          <img src="@/assets/logo.svg" alt="Meetups" />
        </router-link>
      </h1>
    </div>
    <nav v-if="!profile.id">
      <router-link to="/login">Создать митап</router-link>
      <router-link to="/login">Вход</router-link>
      <router-link to="/register">Регистрация</router-link>
    </nav>
    <nav v-if="profile.id">
      <router-link to="/">Мои митапы</router-link>
      <router-link to="/">Организуемые митапы</router-link>
      <router-link to="/form">Создать митап</router-link>
      <router-link to="/">
        <span @click="onLogout">{{ profile.fullname }} (выйти)</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { meetupApi } from "@/api";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      profile: "meetup/profile",
    }),
  },
  methods: {
    ...mapActions({
      flush: "meetup/flush",
    }),
    async onLogout() {
      try {
        await meetupApi.logout();
        this.flush();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped src="./Header.css" lang="css"></style>
