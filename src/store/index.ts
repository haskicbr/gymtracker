import { createStore } from 'vuex'
import { DogeGymState, Workout, WorkoutRepeat } from "@/typings/interfaces";


const state: DogeGymState = {
  workouts: [
    {
      id: '11',
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
      id: '11',
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
      id: '11',
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
      id: '12',
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

export default createStore({
  state,
  getters: {},
  mutations: {
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
})
