<script lang="ts" setup>
import uuid from 'uuidv4';

import { Workout } from "@/typings/interfaces";
import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import WorkoutAddForm from "@/components/forms/WorkoutAddForm.vue";


const store = useStore();
const router = useRouter();
const route = useRoute();
const deleteWorkout = (id: string) => {
  store.commit('deleteWorkout', id);
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col
        md="4"
        lg="3"
        cols="12"
      >
        <WorkoutAddForm />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="workout in store.state.workouts"
        :key="workout.id"
        md="4"
        lg="3"
        cols="6"
      >
        <v-card
          class="mx-auto"
        >
          <v-card-content>
            <div>
              <div class="text-overline mb-1">
                {{ workout.title }}
              </div>
              <div class="text-h6 mb-1" />
              <div class="text-caption">
                {{ workout.description }}
              </div>

              <div class="text-caption">
                <v-table style="width: 100%">
                  <tbody>
                    <tr
                      v-for="(item, index) in workout.repeats"
                      :key="index"
                    >
                      <td class="text-center">
                        {{ index + 1 }}
                      </td>
                      <td class="text-center">
                        {{ item.weight }} кг
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </div>
          </v-card-content>

          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
