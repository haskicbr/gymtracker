<script lang="ts">
import { defineComponent } from "vue";
import uuid from "uuidv4";
import { Workout } from "@/typings/interfaces";
import router from "@/router";
export default defineComponent({
  name: "WorkoutAddForm",
  methods: {
    createWorkout() {
      router.getRoutes()
      const workoutUid = uuid();

      const workoutModel: Workout = {
        title: '',
        description: '',
        id: workoutUid,
        repeats: []
      };

      const url = router.resolve({ name: 'workoutForm', params: { id: workoutUid } }).href;
      router.push(url);

      this.$store.commit('addWorkout', workoutModel);
    }
  }
});
</script>

<template>
  <v-card
    style="max-width: 400px;"
    class="mx-auto"
  >
    <v-card-actions>
      <v-btn
        width="100%"
        text
        color="primary"
        @click="createWorkout"
      >
        Добавить новое упражнение
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

