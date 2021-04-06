import Vue from "vue";
import VueRouter from "vue-router";
import MeetupsPage from "../views/MeetupsPage";
import MeetupPage from "../views/MeetupPage";
import LoginPage from "@/views/Login/LoginPage";
import RegisterPage from "../views/RegisterPage";
import MeetupForm from "@/views/MeetupForm/MeetupForm";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  base: "/meetupProject",
  routes: [
    {
      path: "/",
      name: "meetups",
      component: MeetupsPage,
    },
    {
      path: "/meetup/:meetupId",
      name: "meetup",
      component: MeetupPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/form",
      name: "form",
      component: MeetupForm,
    },
  ],
});
