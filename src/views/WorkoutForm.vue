<script lang="ts" setup>

import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";

import { ref, onMounted } from 'vue';
import { Workout } from "@/typings/interfaces";

const store = useStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id;

const root = ref();

let workout: Workout | undefined;

if (id) {
  workout = store.state.workouts.find((e: Workout) => e.id === id);
}

if (typeof (workout) === 'undefined') {
  workout = {
    id: null,
    title: '',
    description: '',
    repetition: []
  };
}

workout = workout as Workout;

let title = ref(workout.title);
let description = ref(workout.description);

const saveWorkout = () => {
  workout = workout as Workout;
  workout.title = title.value;
  workout.description = description.value;
  if (!workout.id) {
    workout.id = (new Date()).toString();
    store.commit('addWorkout', workout);
  }

  router.push({path: '/workouts'});
};

</script>


<template>
  <v-container>
    <v-form
      ref="form"
    >
      <v-text-field
        v-model="title"
        label="Заголовок"
      />

      <v-text-field
        v-model="description"
        label="Описание"
      />
      <div>
        Подходы:


        <v-btn>добавить подход</v-btn>
      </div>

      <v-btn @click="saveWorkout">
        Сохранить
      </v-btn>
    </v-form>
  </v-container>
</template>
