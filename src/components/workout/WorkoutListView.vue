
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
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-content>
      <div>
        <div
          style="display: flex"
          class="flex full-width text-overline flex-row justify-space-between"
        >
          <div style="display: flex">
            {{ workout.title }}
          </div>

          <v-btn
            variant="text"
            :icon="(isShowedWorkoutRepeats) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="changeShowWorkoutRepeats"
          />
        </div>

        <div class="text-caption">
          {{ workout.description }}
        </div>

        <div
          v-if="isShowedWorkoutRepeats"
          class=" mt-5"
        >
          <v-table style="width: 100%">
            <thead>
              <tr>
                <td
                  style="padding-left: 0"
                  class="text-left"
                >
                  Подходы
                </td>
                <td class="text-center">
                  Вес
                </td>
                <td class="text-center">
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
                <td class="text-center">
                  {{ item.weight }} кг
                </td>
                <td class="text-center">
                  {{ item.repeats }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </v-card-content>

    <v-card-actions>
      <div class="card-action-btn-container flex-row justify-space-between">
        <router-link
          v-slot="{ navigate }"
          custom
          :to="'/workouts/' + workout.id"
        >
          <v-btn
            text
            color="primary"
            @click="navigate"
          >
            Изменить
          </v-btn>
        </router-link>

        <v-btn
          text
          color="warning"
          @click="deleteWorkout(workout.id)"
        >
          удалить
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
