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
  <v-card-title>
    Упражнения
    <v-btn
      class="ma-2"
      variant="outlined"
      icon="mdi-plus"
      color="green"
      size="small"
      @click="createWorkout"
    />
  </v-card-title>
</template>

