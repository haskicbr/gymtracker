import HomeView from "@/views/HomeView.vue";
import { RouteRecordRaw } from 'vue-router';

type CustomRouteRecordRaw = RouteRecordRaw & { icon?: string, isMainMenu: boolean, title?: string }

const routes: Array<CustomRouteRecordRaw> = [
  {
    title: 'Главная страничка',
    icon: 'mdi-view-dashboard',
    path: '/',
    name: 'home',
    component: HomeView,
    isMainMenu:true,
  },
  {
    title: 'Тренировочки',
    icon: 'mdi-view-dashboard',
    path: '/workout-plans',
    name: 'workoutPlans',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlans.vue'),
    isMainMenu:true,
  },  {
    title: 'Упражнения',
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
    title: 'О приложении',
    icon: 'mdi-view-dashboard',
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    isMainMenu:true,
  },

  {
    title: 'test',
    icon: 'mdi-view-dashboard',
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestComponent.vue'),
    isMainMenu:true,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/workout-plan/:id',
    name: 'workoutPlanForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlan.vue'),
    isMainMenu:false,
  },
  {
    path: '/workout-plan-running/:id',
    name: 'workoutPlanRunning',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlanRunning.vue'),
    isMainMenu:false,
  }
];
export default routes;
