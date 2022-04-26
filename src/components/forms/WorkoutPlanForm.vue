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
    if (this.$props.planId) {
      workoutPlan = this.$store.getters.getWorkoutPlanById(this.$props.planId);
    }
    if (!workoutPlan) {
      workoutPlan = {
        id: uuid(),
        title: 'test',
        description: '',
        workouts: []
      };

      workoutPlan = workoutPlan as WorkoutPlan;

      this.$store.commit('addWorkoutPlan', workoutPlan);
    }

    const workoutOptions = this.$store.state.workouts.map((workoutEl: Workout) => {
      const { id, title, description } = workoutEl;
      return { id, title, description };
    });


    const checkedWorkoutIds: { id: string, order: number }[] = workoutPlan.workouts;

    return {
      workoutPlan,
      workoutOptions,
      checkedWorkoutIds,
      activeIcon: 'mdi-check-circle-outline',
      defaultIcon: 'mdi-checkbox-blank-circle-outline'
    }
  },


  methods: {

    checkWorkoutInPlan(checkId: string) {
      return this.workoutPlan.workouts.find(({ id }: { id: string, order: number }) => id === checkId);
    },

    checkWorkout(workoutId: string) {

      const ids = this.checkedWorkoutIds;
      const index = ids.findIndex(({ id }) => id === workoutId);

      if (index >= 0) {
        ids.splice(index, 1)
      } else {
        ids.push({ id: workoutId, order: 0 });
      }

      this.workoutPlan.workouts = ids;
      this.$store.commit('updateWorkoutPlan', this.workoutPlan);
    },

    backToPlans() {
      router.push({ path: '/workout-plans' });
    },

    workoutOrderDown(options: { id: string, order: number }) {
      const arr: Workout[] = this.workoutPlan.workouts;
      const sortedIndex = arr.findIndex(e => e.id === options.id);
      const newArr = arr.splice(sortedIndex, 1);
      arr.splice(sortedIndex + 1, 0, newArr[0]);
    },

    workoutOrderUp(options: { id: string, order: number }) {
      const arr: Workout[] = this.workoutPlan.workouts;
      const sortedIndex = arr.findIndex(e => e.id === options.id);
      const newArr = arr.splice(sortedIndex, 1);
      arr.splice(sortedIndex - 1, 0, newArr[0]);
    }
  }
});
</script>

<template>
  <div>
    <v-form @submit="backToPlans">
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
            <v-list-item-subtitle/>
          </v-list-item-header>
        </v-list-item>
        <v-list-item>
          <v-text-field
            v-model="workoutPlan.title"
            color="primary"
            label="Название тренировки"
            :hide-details="true"
          />
        </v-list-item>

        <v-list-item>
          <v-text-field
            v-model="workoutPlan.description"
            color="primary"
            label="Описание тренировки"
            :hide-details="true"
          />
        </v-list-item>


        <v-list-item
          v-for="(option,index) in workoutPlan.workouts"
          :key="option.id"
          three-line
        >
          <template v-if="checkWorkoutInPlan(option.id)">
            <v-list-item-header>
              <v-list-item-title>{{ $store.getters.getWorkoutById(option.id).title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $store.getters.getWorkoutById(option.id).description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                consectetur adipiscing elit.
              </v-list-item-subtitle>
            </v-list-item-header>
            <v-btn
              :disabled="index === (workoutPlan.workouts.length -1)"
              variant="text"
              color="grey"
              :icon="'mdi-chevron-down'"
              @click.stop="workoutOrderDown(option)"
            />
            <v-btn
              :disabled="index === 0"
              variant="text"
              color="grey"
              :icon="'mdi-chevron-up'"
              @click.stop="workoutOrderUp(option)"
            />
            <v-list-item-avatar end>
              <v-btn
                variant="text"
                :color="checkWorkoutInPlan(option.id) ? 'primary' : 'grey '"
                :icon="checkWorkoutInPlan(option.id) ? activeIcon : defaultIcon"
                @click.stop="checkWorkout(option.id)"
              />
            </v-list-item-avatar>
          </template>
        </v-list-item>


        <v-list-item
          v-for="option in workoutOptions"
          :key="option.id"
          three-line
        >
          <template v-if="!checkWorkoutInPlan(option.id)">
            <v-list-item-header>
              <v-list-item-title>{{ option.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ option.description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                consectetur adipiscing elit.
              </v-list-item-subtitle>
            </v-list-item-header>

            <v-list-item-avatar end>
              <v-btn
                variant="text"
                :color="checkWorkoutInPlan(option.id) ? 'primary' : 'grey '"
                :icon="checkWorkoutInPlan(option.id) ? activeIcon : defaultIcon"
                @click.stop="checkWorkout(option.id)"
              />
            </v-list-item-avatar>
          </template>
        </v-list-item>


        <v-btn
          style="display: none"
          type="submit"
        />
      </v-card>
    </v-form>
  </div>
</template>

