import HomeView from "@/views/HomeView.vue";
import { RouteRecordRaw } from 'vue-router';

type CustomRouteRecordRaw = RouteRecordRaw & { icon?: string, isMainMenu: boolean, title?: string }

const routes: Array<CustomRouteRecordRaw> = [
  {
    title: 'Главная страничка',
    icon: 'mdi-view-dashboard',
    path: '/',
    name: 'home',
    redirect: '/workout-plans',
    //component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlans.vue'),
    isMainMenu:false,
  },
  {
    title: 'Тренировочки',
    icon: 'mdi-weight-lifter',
    path: '/workout-plans',
    name: 'workoutPlans',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutPlans.vue'),
    isMainMenu:false,
  },  {
    title: 'Упражнения',
    icon: 'mdi-dumbbell',
    path: '/workouts',
    name: 'workouts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Workouts.vue'),
    isMainMenu:false,
  },
  {
    icon: 'mdi-view-dashboard',
    path: '/workouts/:id',
    name: 'workoutForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/WorkoutForm.vue'),
    isMainMenu:false,
  },
  {
    title: 'Импорт/экспорт',
    path: '/import-export',
    name: 'ImportExport',
    icon: 'mdi-swap-horizontal-circle-outline',
    component: () => import(/* webpackChunkName: "about" */ '../views/ImportExport.vue'),
    isMainMenu:true,
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
  },
  {
    path: '/state-from-shared-link/:uid',
    name: 'stateFromSharedLink',
    component: () => import(/* webpackChunkName: "about" */ '../views/StateFromSharedLink.vue'),
    isMainMenu:false,
  }
];
export default routes;
