import HomeView from "@/views/HomeView.vue";
import { RouteRecordRaw } from 'vue-router';

type CustomRouteRecordRaw = RouteRecordRaw & { icon?: string }

const routes: Array<CustomRouteRecordRaw> = [
  {
    icon: 'mdi-view-dashboard',
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
];
export default routes;
