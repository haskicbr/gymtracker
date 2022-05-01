<script lang="ts" setup>
import uuid from 'uuidv4';

import { Workout } from "@/typings/interfaces";
import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import WorkoutAddForm from "@/components/forms/WorkoutAddForm.vue";
import WorkoutListView from "@/components/workout/WorkoutListView.vue";


const store = useStore();
const router = useRouter();
const route = useRoute();
const deleteWorkout = (id: string) => {
  store.commit('deleteWorkout', id);
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        md="4"
        lg="3"
        cols="12"
      >
        <WorkoutAddForm />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="workout in store.state.workouts"
        :key="workout.id"
        md="4"
        sm="6"
        lg="3"
        cols="12"
      >
        <WorkoutListView :workout="workout" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.card-action-btn-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row
}
</style>
