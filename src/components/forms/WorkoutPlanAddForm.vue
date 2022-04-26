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
  <v-card
    class="mx-auto"
  >
    <v-card-actions>
      <v-btn
        width="100%"
        text
        color="primary"
        @click="createWorkoutPlan"
      >
        Добавить новый план тренировок
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

