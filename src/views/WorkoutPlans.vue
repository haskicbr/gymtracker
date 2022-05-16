
<script lang="ts">

import { defineComponent } from "vue";
import router from "@/router";
import WorkoutPlanAddForm from "@/components/forms/WorkoutPlanAddForm.vue";
import WorkoutPlanListView from "@/components/workout/WorkoutPlanListView.vue";
import { WorkoutPlan } from "@/typings/interfaces";

export default defineComponent({
  name: "WorkoutPlans",
  components: {
    WorkoutPlanAddForm,
    WorkoutPlanListView
  },
  data() {
    const workoutPlans = this.$store.state.workoutPlans;
    return {
      workoutPlans
    }
  },

  methods: {

    isAvailableWorkoutPlanToRun(workoutPlan: WorkoutPlan) {
      if (workoutPlan.workouts.length === 0) {
        return false;
      }

      let isAvailable = true;

      workoutPlan.workouts.forEach(id => {
        const workout = this.$store.getters.getWorkoutById(id);
        if (workout.repeats.length === 0) {
          isAvailable = false;
        }
      });
      return isAvailable;
    },

    deleteWorkoutPlan(id: string) {
      this.$store.commit('deleteWorkoutPlan', id)
    },
    getPlanFormUrl(id: string) {
      return router.resolve({ name: 'workoutPlanForm', params: { id } })
    },
    runWorkoutPlan(id: string) {
      const url =  router.resolve({ name: 'workoutPlanRunning', params: { id } });

      this.$store.commit('setWorkoutPlanActive', id);

      router.push(url);
    }
  }
});
</script>



<template>
  <v-card
    class="mx-auto"
    style="max-width: 600px"
  >
    <v-card-content>
      <WorkoutPlanAddForm />
      <v-table>
        <tbody>
          <template
            v-for="workoutPlan in workoutPlans"
            :key="workoutPlan.id"
          >
            <WorkoutPlanListView :workout-plan="workoutPlan" />
          </template>
        </tbody>
      </v-table>
    </v-card-content>
  </v-card>
</template>
