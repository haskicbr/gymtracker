<script>
import { defineComponent } from "vue";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "WorkoutPlan",
  components: {
    WorkoutPlanForm
  },

  data() {
    const id = this.$route.params.id;
    return {
      id
    }
  }
});
</script>


<template>
  <div>
    <WorkoutPlanForm :plan-id="id" />
  </div>
</template>
