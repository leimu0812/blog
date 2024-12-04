import { createWebHistory, createRouter } from "vue-router";

import Home from "@/components/Home.vue";
import HomeView from "@/views/main/HomeView.vue";
import ShowView from "@/views/main/ShowView.vue";
import OtherView from "@/views/main/OtherView.vue";
import AboutView from "@/views/main/AboutView.vue";
import MessageView from "@/views/main/MessageView.vue";
import FriendView from "@/views/main/FriendView.vue";
import ChannelView from "@/views/main/ChannelView.vue";
import ArticleView from "@/views/main/ArticleView.vue";
import JottingView from "@/views/main/JottingView.vue";

import NoPage from "@/views/system/404.vue";
const routes = [
  {
    path: "/",
    component: Home,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "show",
        name: "show",
        component: ShowView,
      },
      {
        path: "about",
        name: "about",
        component: AboutView,
      },
      {
        path: "message",
        name: "message",
        component: MessageView,
      },
      {
        path: "friend",
        name: "friend",
        component: FriendView,
      },
      {
        path: "other",
        name: "other",
        component: OtherView,
      },
      {
        path: "channel/:id",
        name: "channel",
        component: ChannelView,
      },
      {
        path: "article/:id",
        name: "article",
        component: ArticleView,
      },
      {
        path: "jotting",
        name: "jotting",
        component: JottingView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NoPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
