<template>
  <AuthLayout title="Вход">
    <form class="form" @submit="sendLoginForm">
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input
            type="email"
            class="form-control"
            placeholder="demo@email"
            v-model="email"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="password"
          />
        </div>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button sbutton_primary">Войти</button>
      </div>
      <div class="form__append">
        Нет аккаунта?
        <router-link :to="{ name: 'register' }" class="link"
          >Зарегистрируйтесь</router-link
        >
      </div>
    </form>
  </AuthLayout>
</template>

<script>
import AuthLayout from "@/components/Layouts/AuthLayout";
import { mapGetters, mapActions } from "vuex";
import { meetupApi } from "@/api";

export default {
  name: "Login",
  components: { AuthLayout },
  data() {
    return {
      email: "demo@email",
      password: "password",
      // user: null,
    };
  },
  computed: {
    ...mapGetters({
      profile: "profile/profile",
    }),
  },
  methods: {
    ...mapActions({
      setProfile: "profile/setProfile",
    }),
    canSend() {
      if (!this.email) {
        alert("Требуется ввести Email");
        return;
      } else if (!this.password) {
        alert("Требуется ввести пароль");
        return;
      } else {
        return true;
      }
    },

    async sendLoginForm(e) {
      e.preventDefault();
      if (!this.canSend()) return;

      const email = this.email;
      const password = this.password;

      const result = await meetupApi.login({ email, password });
      if (result.message) {
        return;
      }
      this.setProfile(result);
      localStorage.setItem("profile", JSON.stringify(result));
      this.$router.push({ name: "meetups" });
    },
  },
  mounted() {
    setTimeout(() => {
      // alert("Для входа используйте демо-пользователя");
    }, 1500);
  },
};
</script>

<style scoped src="./Login.css"></style>
