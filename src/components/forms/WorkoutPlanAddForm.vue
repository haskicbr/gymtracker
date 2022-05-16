<script lang="ts">
import { defineComponent } from "vue";
import uuid from "uuidv4";
import { WorkoutPlan } from "@/typings/interfaces";
import router from "@/router";
export default defineComponent({
  name: "WorkoutPlanAddForm",
  methods: {
    createWorkoutPlan() {
      router.getRoutes()
      const planUid = uuid();

      const planModel: WorkoutPlan = {
        title: '',
        description: '',
        id: planUid,
        workouts: []
      };

      const url = router.resolve({ name: 'workoutPlanForm', params: { id: planUid } }).href;
      this.$store.commit('addWorkoutPlan', planModel);

      router.push(url);
    }
  }
});
</script>

<template>
  <v-card-title>
    Тренировки
    <v-btn
      class="ma-2"
      variant="outlined"
      icon="mdi-plus"
      color="green"
      size="small"
      @click="createWorkoutPlan"
    />
  </v-card-title>
</template>

