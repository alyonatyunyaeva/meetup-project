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
      <router-link :to="{ name: 'attending' }">Мои митапы</router-link>
      <router-link :to="{ name: 'organizing' }"
        >Организуемые митапы</router-link
      >
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
      profile: "profile/profile",
    }),
  },
  methods: {
    ...mapActions({
      flush: "profile/flush",
    }),
    async onLogout() {
      try {
        await meetupApi.logout();
        localStorage.removeItem("profile");
        this.flush();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped src="./Header.css" lang="css"></style>
