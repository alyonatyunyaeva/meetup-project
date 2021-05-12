<template>
  <AuthLayout title="Регистрация">
    <form class="form" @submit="sendRegisterForm">
      <Input
        label="Email"
        type="email"
        v-model="email"
        :showError="$v.email.$invalid && submited"
        :errorText="errorTextEmail()"
      />
      <Input
        label="Имя"
        v-model="profileName"
        :showError="$v.profileName.$invalid && submited"
        errorText="Требуется ввести полное имя"
      />

      <Input
        label="Пароль"
        type="password"
        placeholder="password"
        v-model="password"
        :showError="$v.password.$invalid && submited"
        :errorText="errorTextPassword()"
      />
      <Input
        label="Повтор пароля"
        type="password"
        placeholder="password"
        v-model="repeatPassword"
        :showError="$v.repeatPassword.$invalid && submited"
        :errorText="errorTextRepeatPassword()"
      />
      <div class="form-group">
        <label class="checkbox"
          ><input type="checkbox" v-model="agreement" /> Я согласен с условиями
        </label>
        <div v-if="$v.agreement.$invalid && submited" style="color: red">
          Необходимо согласиться с условиями
        </div>
      </div>

      <div class="form__buttons">
        <Button type="submit" primary>
          Зарегистрироваться
        </Button>
      </div>
      <div class="form__append">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script>
import AuthLayout from "@/components/Layouts/AuthLayout";
import { meetupApi } from "@/api";
import { mapActions } from "vuex";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
const mustAgree = (value) => value;

export default {
  name: "Register",
  components: {
    AuthLayout,
    Input,
    Button,
  },
  validations: {
    email: {
      required,
      email,
    },
    profileName: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
    agreement: { mustAgree },
  },
  data() {
    return {
      email: "",
      profileName: "",
      password: "",
      repeatPassword: "",
      agreement: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions({
      setProfile: "profile/setProfile",
    }),
    errorTextEmail() {
      if (!this.$v.email.required) {
        return "Требуется ввести email";
      }
      if (!this.$v.email.email) {
        return "Неверный формат email";
      }
    },
    errorTextPassword() {
      if (!this.$v.password.required) {
        return "Требуется ввести пароль";
      }
      if (!this.$v.password.minLength) {
        return ` Пароль должен содержать хотя бы ${this.$v.password.$params.minLength.min} символов`;
      }
    },
    errorTextRepeatPassword() {
      if (!this.$v.repeatPassword.required) {
        return "Требуется ввести пароль";
      }
      if (!this.$v.repeatPassword.sameAsPassword) {
        return ` Пароли должены совпадать`;
      }
    },
    async sendRegisterForm(e) {
      e.preventDefault();
      this.submited = true;
      if (this.$v.$invalid) {
        return;
      }
      const result = await meetupApi.register(
        this.email,
        this.profileName,
        this.password
      );
      if (result.message) {
        return;
      }
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped></style>
