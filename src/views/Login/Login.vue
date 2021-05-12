<template>
  <AuthLayout title="Вход">
    <form class="form" @submit="sendLoginForm">
      <Input
        label="Email"
        type="email"
        placeholder="demo@email"
        v-model.lazy="email"
        :showError="$v.email.$invalid"
        errorText="Требуется ввести email"
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="password"
        v-model.lazy="password"
        :showError="$v.password.$invalid"
        errorText="Требуется ввести пароль"
      />

      <div class="form__buttons">
        <Button type="submit" primary>Войти</Button>
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
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { required, email } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
import { meetupApi } from "@/api";

export default {
  name: "Login",
  components: { AuthLayout, Input, Button },
  data() {
    return {
      email: "demo@email",
      password: "password",
    };
  },
  validations: {
    email: {
      required,
      // email,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      profile: "profile/profile",
    }),
    // emailErrorText() {
    //   return this.$v.email.required && !this.$v.email.email
    //     ? "Формат почты"
    //     : "Требуется ввести Email";
    // },
  },
  methods: {
    ...mapActions({
      setProfile: "profile/setProfile",
    }),

    async sendLoginForm(e) {
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        return;
      }
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

<style scoped></style>
