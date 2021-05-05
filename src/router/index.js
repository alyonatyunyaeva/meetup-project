import Vue from "vue";
import VueRouter from "vue-router";
import MeetupsPage from "../views/MeetupsPage/MeetupsPage";
import MeetupPage from "../views/MeetupPage/MeetupPage";
import Login from "@/views/Login/Login";
import Register from "../views/Register/Register";
import MeetupForm from "@/views/MeetupForm/MeetupForm";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      redirect: "/meetups",
    },
    {
      path: "/meetups",
      name: "meetups",
      component: MeetupsPage,
      children: [
        {
          path: "organizing",
          name: "organizing",
          component: MeetupsPage,
        },
        {
          path: "attending",
          name: "attending",
          component: MeetupsPage,
        },
      ],
    },
    {
      path: "/meetup/:meetupId",
      name: "meetup",
      component: MeetupPage,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/form",
      name: "form",
      component: MeetupForm,
    },
  ],
});
