<script lang="ts">

import { defineComponent } from "vue";

import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";
import TestVComponent from "@/components/test-components/TestVComponent.vue";
import { ref, onMounted } from 'vue';
import { Workout, WorkoutRepeat } from "@/typings/interfaces";


export default defineComponent({


  data() {

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const id = route.params.id;

    let workout: Workout | undefined;

    if (id) {
      workout = store.state.workouts.find((e: Workout) => e.id === id);
    }

    if (typeof(workout) === 'undefined') {
      workout = {
        id: '',
        title: '',
        description: '',
        repeats: []
      } as Workout;
    }

    const workoutModel = {...workout};
    const workoutRepeats = workout.repeats;
let newRepeatWeight = 1;
    return {
      workout,
      workoutModel,
      workoutRepeats,
      store,
      router,
      newRepeatWeight
    }
  },
  methods: {
    saveWorkout() {
      if (!(<Workout>this.workout).id) {
        this.workoutModel.id = (new Date()).toString();
        this.store.commit('addWorkout', {...this.workoutModel});
      } else {
        this.store.commit('updateWorkout', {...this.workoutModel});
      }

      this.router.push({ path: '/workouts' });
    }
  },
});

</script>


<template>
  <v-container>
    <v-form
      ref="form"
    >
      <v-text-field
        v-model="workoutModel.title"
        label="Заголовок"
      />

      <v-text-field
        v-model="workoutModel.description"
        label="Описание"
      />
      <div>
        Подходы:

        <template
          v-for="(repeat, index) in workoutRepeats"
          v-if="workoutModel.id"
          :key="index"
        >
          <v-text-field
            v-model="repeat.weight"
            type="number"
          />

          <v-btn @click="$store.commit('increaseRepeat', {workout:workoutModel, repeatIndex:index})">
            +
          </v-btn>
          <v-btn @click="$store.commit('decreaseRepeat', {workout:workoutModel, repeatIndex:index})">
            -
          </v-btn>

          <v-btn @click="$store.commit('deleteRepeat', {workout:workoutModel, repeatIndex:index})">
            удалить
          </v-btn>
        </template>

        <v-text-field
          v-model="newRepeatWeight"
          label="Вес"
        />
        <v-btn
          @click="$store.commit('addRepeat', {workout:workoutModel, repeat:{
            weight: newRepeatWeight
          }})"
        >
          добавить подход
        </v-btn>
      </div>

      <v-btn @click="saveWorkout">
        Сохранить
      </v-btn>
    </v-form>
  </v-container>
</template>
