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

const workouts = store.state.workouts.sort((a,b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB ){
    return -1;
  }
  if ( titleA > titleB ){
    return 1;
  }
  return 0;
});
</script>

<template>
  <v-card
    class="mx-auto mt-10"
    style="max-width: 600px"
  >
    <v-card-content>
      <WorkoutAddForm />

      <v-table>
        <tbody>
          <template
            v-for="workout in workouts"
            :key="workout.id"
          >
            <WorkoutListView :workout="workout" />
          </template>
        </tbody>
      </v-table>
    </v-card-content>
  </v-card>
</template>

<style lang="scss">
.card-action-btn-container {

}
</style>
