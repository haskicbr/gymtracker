<script lang="ts">

import { defineComponent } from "vue";
import { Workout, WorkoutPlan } from "@/typings/interfaces";
import uuid from 'uuidv4';
import router from "@/router";

export default defineComponent({
  name: "WorkoutPlanForm",


  props: {
    planId: {
      type: String,
      default: null
    }
  },

  data() {

    let workoutPlan;
    if(this.$props.planId) {
      workoutPlan = this.$store.getters.getWorkoutPlanById(this.$props.planId);

      console.log({workoutPlan, id: this.$props.planId})
    } else {

    }


    console.log([workoutPlan])
    if (!workoutPlan) {
      workoutPlan = {
        id: uuid(),
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
      checkedWorkoutIds,
      activeIcon: 'mdi-check-circle-outline',
      defaultIcon:'mdi-checkbox-blank-circle-outline'
    }
  },


  methods: {

    checkWorkout(workoutId: string) {

      const ids = this.checkedWorkoutIds;
      const index = ids.findIndex((el: string) => el === workoutId);

      if (index >= 0) {
        ids.splice(index, 1)
      } else {
        ids.push(workoutId);
      }

      this.workoutPlan.workouts = ids;
      this.$store.commit('updateWorkoutPlan', this.workoutPlan);
    }
  }
});
</script>

<template>
  <div>
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
          <v-list-item-subtitle />
        </v-list-item-header>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="workoutPlan.title"
          color="primary"
          label="Заголовок"
          :hide-details="true"
        />
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="workoutPlan.description"
          color="primary"
          label="Описание"
          :hide-details="true"
        />
      </v-list-item>
      <v-list-item
        v-for="option in workoutOptions"
        :key="option.id"
        three-line
        @click.stop="checkWorkout(option.id)"
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
              :color="checkedWorkoutIds.includes(option.id) ? 'primary' : 'grey '"
              :icon="checkedWorkoutIds.includes(option.id) ? activeIcon : defaultIcon"
            />
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-card>
  </div>
</template>

