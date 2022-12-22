import { createStore } from 'vuex'
import { DogeGymState, Workout, WorkoutPlan, WorkoutRepeat } from "@/typings/interfaces";
import workoutPlans from "@/views/WorkoutPlans.vue";

const storageName = 'dogeGymState';

let storageString = localStorage.getItem(storageName);

storageString = storageString === null ? 'null' : storageString;

const storageState = JSON.parse(storageString);

let state: DogeGymState = {

  settings: {
    weightStep: 1.25
  },


  workoutPlanStarted: false,

  workoutPlans: [
    {
      id: '1',
      title: 'Тренировочка в понедельник',
      description: 'DEMO',
      workouts: ['1', '2', '3']
    },
    {
      id: '2',
      title: 'Тренировочка в среду',
      description: 'DEMO',
      workouts: ['4','5']
    },
  ],

  workouts: [
    {
      id: '1',
      title: 'Жим лежа',
      description: '',
      repeats: [{
        weight: 50,
        repeats: 10,
      }, {
        weight: 50,
        repeats: 10,
      }, {
        weight: 50,
        repeats: 10,
      }, {
        weight: 50,
        repeats: 10,
      }]
    }, {
      id: '2',
      title: 'Разводка',
      description: 'Угол 45 градусов',
      repeats: [{
        weight: 5,
        repeats: 10,
      }, {
        weight: 5,
        repeats: 10,
      }, {
        weight: 5,
        repeats: 10,
      }, {
        weight: 5,
        repeats: 10,
      }]
    }, {
      id: '3',
      title: 'Тяга блока трицепс',
      description: 'Веревочка',
      repeats: [{
        weight: 7.5,
        repeats: 16,
      }, {
        weight: 7.5,
        repeats: 16,
      }, {
        weight: 7.5,
        repeats: 16,
      }, {
        weight: 7.5,
        repeats: 16,
      }]
    },
    {
      id: '4',
      title: 'Подтягивания',
      description: 'Узкий хват',
      repeats: [{
        weight: 0,
        repeats: 10,
      }, {
        weight: 0,
        repeats: 10,
      }, {
        weight: 0,
        repeats: 10,
      }]
    },
    {
      id: '5',
      title: 'Становая тяга',
      description: '',
      repeats: [{
        weight: 40,
        repeats: 10,
      }, {
        weight: 40,
        repeats: 10,
      }, {
        weight: 40,
        repeats: 10,
      }]
    }
  ]
}


if (storageState) {

  if (!storageState.settings) {
    storageState.settings = state.settings;
  }

  state = { ...storageState };


}

const store = createStore({
  state,
  getters: {
    getWorkoutById: (state: DogeGymState) => (id: string): Workout | undefined => {
      return state.workouts.find(el => el.id === id);
    },
    getWorkoutPlanById: (state: DogeGymState) => (id: string): WorkoutPlan | undefined => {
      return state.workoutPlans.find(el => el.id === id);
    },

    // Получить индекс группировки
    getMaxWorkoutOrder() {
      const max = [{ y: 1 }, { y: 2 }, { y: 3 }].reduce(function (prev, current) {
        return (prev.y > current.y) ? prev : current
      })
    }
  },
  mutations: {
    addWorkoutPlan(state, workoutPlan: WorkoutPlan) {
      state.workoutPlans.push(workoutPlan);
    },

    updateWorkoutPlan(state, workoutPlan: WorkoutPlan) {
      const index = state.workoutPlans.findIndex(e => workoutPlan.id === e.id);
      state.workoutPlans[index] = workoutPlan;
    },

    addWorkout(state, workout: Workout) {
      state.workouts.push(workout);
    },

    updateWorkout(state, workout: Workout) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index] = { ...workout };
    },

    deleteWorkout(state, id: string) {

      let breakDelete = false;

      state.workoutPlans.forEach(workoutPlan => {
        if(workoutPlan.workouts.includes(id)) {
          breakDelete = true;
        }
      });

      if (breakDelete) {
        return;
      }

      const index = state.workouts.findIndex(e => e.id === id);
      if (index > -1) {
        state.workouts.splice(index, 1);
      }
    },

    deleteWorkoutPlan(state, id: string) {
      const index = state.workoutPlans.findIndex(e => e.id === id);
      if (index > -1) {
        state.workoutPlans.splice(index, 1);
      }
    },

    addRepeat(state, { workout, repeat }: { workout: Workout, repeat: WorkoutRepeat }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats.push(repeat);
    },
    deleteRepeat(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats.splice(repeatIndex, 1);
    },

    increaseRepeat(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats[repeatIndex].weight += state.settings.weightStep;
    },

    increaseRepeatCount(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats[repeatIndex].repeats += 1;
    },
    decreaseRepeat(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats[repeatIndex].weight -= state.settings.weightStep;
    },

    decreaseRepeatCount(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats[repeatIndex].repeats -= 1;
    },

    setWorkoutPlanActive(state, id: string) {
      state.workoutPlanStarted = true;
      state.workoutPlanActiveId = id;
    },

    setWorkoutPlanInActive(state) {
      state.workoutPlanStarted = false;
      state.workoutPlanActiveId = undefined;
    },

  },
  actions: {},
  modules: {}
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem(storageName, JSON.stringify(store.state));
});

window.addEventListener("load",function() {
  setTimeout(function(){
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});

export default store;
