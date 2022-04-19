import HomeView from "@/views/HomeView.vue";
import { RouteRecordRaw } from 'vue-router';

type CustomRouteRecordRaw = RouteRecordRaw & { icon?: string, isMainMenu: boolean }

const routes: Array<CustomRouteRecordRaw> = [
  {
    icon: 'mdi-view-dashboard',
    path: '/',
    name: 'home',
    component: HomeView,
    isMainMenu:true,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/workout-plans',
    name: 'workout plans',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlans.vue'),
    isMainMenu:true,
  },  {

    icon: 'mdi-view-dashboard',
    path: '/workouts',
    name: 'workouts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Workouts.vue'),
    isMainMenu:true,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/workouts/:id',
    name: 'workoutForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutForm.vue'),
    isMainMenu:false,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    isMainMenu:true,
  },

  {
    icon: 'mdi-view-dashboard',
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestComponent.vue'),
    isMainMenu:true,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/workout-plan/:id',
    name: 'workout plan',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlan.vue'),
    isMainMenu:true,
  }
];
export default routes;
