<script>
import { defineComponent } from "vue";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "WorkoutPlan",
  components: {},

  data() {


    const id = this.$route.params.id;

    const workoutPlan = this.$store.getters.getWorkoutPlanById(id);
    const workoutIds = workoutPlan.workouts.map(e => e.id);
    const workouts = [];

    workoutIds.forEach(id => {
      const workout = this.$store.getters.getWorkoutById(id);
      workouts.push(workout);
    });

    return {
      workoutPlanIsCompleted: false,
      workoutPlan,
      workoutIds,
      workouts,
      workoutCounter: 0,
      workoutRepeatCounter: 0
    }
  },

  methods: {
    changeRepeatNext() {
      const repeatsLength = this.workouts[this.workoutCounter].repeats.length;

      if ((repeatsLength - 1) === this.workoutRepeatCounter) {
        this.workoutRepeatCounter = 0;
        if (!this.workouts[this.workoutCounter + 1]) {
          this.workoutPlanIsCompleted = true;
          return;
        }
        this.workoutCounter += 1;
      }
      this.workoutRepeatCounter += 1;
    }
  }
});
</script>


<template>
  <div>
    {{ workoutPlan }}
    {{ workoutIds }}


    <hr>

    <div
      v-for="workout in workouts"
      :key="workout.id"
    >
      {{ workout }}
    </div>


    <div>
      active workout {{ workouts[workoutCounter] }}
    </div>

    <hr>

    <div>
      active repeat {{ workouts[workoutCounter].repeats[workoutRepeatCounter] }}


      <h1 v-if="workoutPlanIsCompleted">
        completed!
      </h1>
      <button
        v-else
        @click="changeRepeatNext"
      >
        {{ workoutRepeatCounter }} next
      </button>
    </div>
  </div>
</template>
