<template>
  <div>
    <h1>
      WorkoutPlan
    </h1>

    <WorkoutPlanForm />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm.vue";

export default defineComponent({
  name: "WorkoutPlan",
  components: {
    WorkoutPlanForm
  }
});
</script>

<style scoped>

</style>
