
<script lang="ts">

import { defineComponent } from "vue";
import router from "@/router";
import WorkoutPlanAddForm from "@/components/forms/WorkoutPlanAddForm.vue";

export default defineComponent({
  name: "WorkoutPlans",
  components: {
    WorkoutPlanAddForm,
  },
  data() {
    const workoutPlans = this.$store.state.workoutPlans;
    return {
      workoutPlans
    }
  },

  methods: {

    deleteWorkoutPlan(id: string) {
      this.$store.commit('deleteWorkoutPlan', id)
    },
    getPlanFormUrl(id: string) {
      return router.resolve({ name: 'workoutPlanForm', params: { id } })
    },
    runWorkoutPlan(id: string) {
      const url =  router.resolve({ name: 'workoutPlanRunning', params: { id } });
      router.push(url);
    }
  }
});
</script>



<template>
  <v-container>
    <v-row>
      <v-col
        md="4"
        lg="3"
        cols="12"
      >
        <WorkoutPlanAddForm />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="workoutPlan in workoutPlans"
        :key="workoutPlan.id"
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
                {{ workoutPlan.title }}
              </div>
              <div class="text-h6 mb-1" />
              <div class="text-caption">
                {{ workoutPlan.description }}
              </div>

              <div
                v-if="true"
                class="text-caption"
              >
                <v-table style="width: 100%">
                  <tbody>
                    <tr
                      v-for="(item, index) in workoutPlan.workouts"
                      :key="index"
                    >
                      <td class="text-center">
                        {{ $store.getters.getWorkoutById(item?.id)?.title }}
                        {{ $store.getters.getWorkoutById(item?.id)?.description }}
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
              :to="getPlanFormUrl(workoutPlan.id)"
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
              @click="deleteWorkoutPlan(workoutPlan.id)"
            >
              удалить
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn
              width="100%"
              text
              color="primary"
              @click="runWorkoutPlan(workoutPlan.id)"
            >
              Начать
            </v-btn>
            <v-card-actions />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
