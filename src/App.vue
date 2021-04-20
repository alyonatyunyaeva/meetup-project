<template>
  <div id="app">
    <BaseLayout>
      <router-view />
    </BaseLayout>
  </div>
</template>

<script>
import BaseLayout from "./components/BaseLayout";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: { BaseLayout },
  methods: {
    ...mapActions({
      setProfile: "profile/setProfile",
    }),
    hasProfile() {
      let profile = localStorage.getItem("profile");
      if (profile) {
        this.setProfile(JSON.parse(profile));
      }
    },
  },
  mounted() {
    this.hasProfile();
  },
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
