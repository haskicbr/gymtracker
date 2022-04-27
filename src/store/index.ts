import { createStore } from 'vuex'
import { DogeGymState, Workout, WorkoutPlan, WorkoutRepeat } from "@/typings/interfaces";
import workoutPlans from "@/views/WorkoutPlans.vue";

const storageName = 'dogeGymState';

let storageString = localStorage.getItem(storageName);

storageString = storageString === null ? 'null' : storageString;

const storageState = JSON.parse(storageString);

let state: DogeGymState = {

  workoutPlans: [
    /*    {

          id: '1',
          title : 'Monday plan',
          description :'Every monday',
          workouts: []

        }*/
  ],

  workouts: [
    {
      id: '1',
      title: 'Жим лежа',
      description: 'uid123123',
      repeats: [{
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }]
    }, {
      id: '2',
      title: 'Жим лежа',
      description: 'uid123123',
      repeats: [{
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }]
    }, {
      id: '3',
      title: 'Жим лежа',
      description: 'uid123123',
      repeats: [{
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }]
    },
    {
      id: '4',
      title: 'Приседания со штангой',
      description: 'uid123123',
      repeats: [{
        weight: 10,
      }, {
        weight: 10,
      }, {
        weight: 10,
      }]
    }
  ]
}


if (storageState) {
  state = storageState;
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
      state.workouts[index].repeats[repeatIndex].weight += 1;
    },
    decreaseRepeat(state, { workout, repeatIndex }: { workout: Workout, repeatIndex: number }) {
      const index = state.workouts.findIndex(e => e.id === workout.id);
      state.workouts[index].repeats[repeatIndex].weight -= 1;
    },
  },
  actions: {},
  modules: {}
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem(storageName, JSON.stringify(store.state));
});

export default store;
