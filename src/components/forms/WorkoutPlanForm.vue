<script lang="ts">

import { defineComponent } from "vue";
import { Workout, WorkoutPlan } from "@/typings/interfaces";

export default defineComponent({
  name: "WorkoutPlanForm",

  data() {

    let workoutPlan: WorkoutPlan = this.$store.state.workoutPlans[0];


    if (!workoutPlan) {
      workoutPlan = {
        id: 'test-id',
        title: 'test',
        description: '',
        workouts: []
      };

      this.$store.commit('addWorkoutPlan', workoutPlan);
    }

    const workoutOptions = this.$store.state.workouts.map((workoutEl: Workout) => {
      const { id, title, description } = workoutEl;
      return { id, title, description };
    });


    const checkedWorkoutIds: string[] = workoutPlan.workouts;

    return {
      workoutPlan,
      workoutOptions,
      checkedWorkoutIds
    }
  },


  methods: {

    checkWorkout(workoutId: string) {

      const ids = this.$data.checkedWorkoutIds;
      const index = ids.findIndex((el: string) => el === workoutId);

      if (index >= 0) {
        ids.splice(index, 1)
      } else {
        ids.push(workoutId);
      }

      this.$data.workoutPlan.workouts = ids;


      this.$store.commit('updateWorkoutPlan', this.$data.workoutPlan);
    }
  }
});
</script>

<template>
  <div>
    {{ checkedWorkoutIds }}

    <v-card
      class="mx-auto mt-10"
      max-width="400"
      tile
    >
      <v-list-item>
        <v-list-item-header>
          <v-list-item-title>Single-line item</v-list-item-title>
        </v-list-item-header>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-header>
          <v-list-item-title>Two-line item</v-list-item-title>
          <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>

      <v-list-item
        v-for="option in workoutOptions"
        :key="option.id"
        three-line
      >
        <v-list-item-header>
          <v-list-item-title>{{ option.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ option.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            consectetur adipiscing elit.
          </v-list-item-subtitle>
        </v-list-item-header>

        <template #append>
          <v-list-item-avatar end>
            <v-btn
              variant="text"
              :color=" checkedWorkoutIds.includes(option.id) ? 'primary' : 'grey '"
              icon="mdi-information"
              @click="checkWorkout(option.id)"
            />
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-card>
  </div>
</template>

