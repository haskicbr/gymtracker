<script lang="ts">

import { defineComponent, PropType } from "vue";
import { WorkoutPlan } from "@/typings/interfaces";
import router from "@/router";

export default defineComponent({
  name: "WorkoutPlanListView",
  props: {
    workoutPlan: {
      required: true,
      type: Object as PropType<WorkoutPlan>
    }
  },

  data() {
    return {
      isShowedWorkouts: false,
    }
  },

  methods: {

    changeShowWorkoutPlanWorkouts() {
      this.isShowedWorkouts = !this.isShowedWorkouts;
    },

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
      const url = router.resolve({ name: 'workoutPlanRunning', params: { id } });

      this.$store.commit('setWorkoutPlanActive', id);

      router.push(url);
    }

  },
});
</script>


<template>
  <tr>
    <td>
      <v-btn
        color="default"
        :icon="isShowedWorkouts ? 'mdi-table-eye-off':'mdi-table-eye'"
        size="x-small"
        @click="changeShowWorkoutPlanWorkouts"
      />
    </td>
    <td>
      <div class="mt-2">
        {{ workoutPlan.title.toLowerCase() }}
      </div>

      <div class="mt-2 mb-2">
        {{ workoutPlan.description.toLowerCase() }}
      </div>
    </td>


    <td>
      <router-link
        v-slot="{ navigate }"
        custom
        :to="getPlanFormUrl(workoutPlan.id)"
      >
        <v-btn
          color="default"
          icon="mdi-pencil"
          size="x-small"
          @click="navigate"
        />
      </router-link>
    </td>

    <td>
      <v-btn
        v-if="isAvailableWorkoutPlanToRun(workoutPlan)"
        color="primary"
        variant="outlined"
        icon="mdi-play"
        size="x-small"
        @click="runWorkoutPlan(workoutPlan.id)"
      />
    </td>

    <td>
      <v-btn
        color="error"
        variant="outlined"
        icon="mdi-delete"
        size="x-small"
        @click="deleteWorkoutPlan(workoutPlan.id)"
      />
    </td>
  </tr>

  <tr>
    <td
      v-if="isShowedWorkouts"
      colspan="5"
      style="padding: 0px"
    >
      <div>
        <v-table
          density="true"
          style="width: 100%"
        >
          <thead>
            <tr>
              <td class="text-left">
                Упражнения
              </td>
              <td class="text-left" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(id, index) in workoutPlan.workouts"
              :key="id"
            >
              <td
                colspan="5"
                class="text-left"
              >
                {{ $store.getters.getWorkoutById(id)?.title }}
                {{ $store.getters.getWorkoutById(id)?.description }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </td>
  </tr>
</template>
