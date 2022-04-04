<template>
  <div>
    {{ $store.state.workoutPlans }}
    <WorkoutPlanForm />
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm.vue";

export default defineComponent({
  name: "WorkoutPlans",
  components: {
    WorkoutPlanForm
  }
});
</script>

<style scoped>

</style>
