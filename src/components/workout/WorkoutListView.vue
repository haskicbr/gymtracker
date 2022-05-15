
<script lang="ts">


import { defineComponent, PropType } from "vue";
import { Workout } from "@/typings/interfaces";

export default defineComponent({
  name: "WorkoutListView",
  props: {
    workout: {
      required: true,
      type: Object as PropType<Workout>
    }
  },

  data() {
    return {
      isShowedWorkoutRepeats: false,
    }
  },

  methods: {
    changeShowWorkoutRepeats() {
      this.isShowedWorkoutRepeats = !this.isShowedWorkoutRepeats;
    },

    deleteWorkout(id: string) {
      this.$store.commit('deleteWorkout', id);
    }
  },
});
</script>


<template>
  <tr>
    <td>
      <v-btn
        color="default"
        :icon="isShowedWorkoutRepeats ? 'mdi-table-eye-off':'mdi-table-eye'"
        size="x-small"
        @click="changeShowWorkoutRepeats"
      />
    </td>
    <td>
      <div class="mt-2">
        {{ workout.title.toLowerCase() }}
      </div>

      <div class="mt-2 mb-2">
        {{ workout.description.toLowerCase() }}
      </div>
    </td>


    <td>
      <router-link
        v-slot="{ navigate }"
        custom
        :to="'/workouts/' + workout.id"
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
        color="error"
        variant="outlined"
        icon="mdi-delete"
        size="x-small"
        @click="deleteWorkout(workout.id)"
      />
    </td>
  </tr>

  <tr>
    <td
      v-if="isShowedWorkoutRepeats"
      colspan="4"
      style="padding: 0px"
    >
      <div class="mt-2">
        <v-table
          density="true"
          style="width: 100%"
        >
          <thead>
            <tr>
              <td

                class="text-left"
              >
                Подходы
              </td>
              <td class="text-left">
                Вес
              </td>
              <td class="text-left">
                Повторения
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in workout.repeats"
              :key="index"
            >
              <td
                class="text-left"
              >
                {{ index + 1 }}
              </td>
              <td class="text-left">
                {{ item.weight }} кг
              </td>
              <td class="text-left">
                {{ item.repeats }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </td>
  </tr>
</template>
