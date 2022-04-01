import { createStore } from 'vuex'
import { DogeGymState, Workout } from "@/typings/interfaces";


const state: DogeGymState = {
  workouts: [
    {
      id: '11',
      title: 'Жим лежа',
      description: 'uid123123',
      repetition: [{
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
      repetition: [{
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
      repetition: [{
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
      repetition: [{
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

    deleteWorkouts(state, id: string) {
      const index = state.workouts.findIndex(e => e.id === id);
      if (index > -1) {
        state.workouts.splice(index, 1);
      }
    }
  },
  actions: {},
  modules: {}
})
