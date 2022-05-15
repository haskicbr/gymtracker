<script lang="ts">
import { defineComponent } from "vue";
import { Workout } from "@/typings/interfaces";

export default defineComponent({
  name: "WorkoutPlan",
  components: {},

  data() {

    const id = this.$route.params.id;

    const workoutPlan = this.$store.getters.getWorkoutPlanById(id);
    const workoutIds = workoutPlan.workouts;
    const workouts: Workout[] = [];

    workoutIds.forEach(id => {
      const workout = this.$store.getters.getWorkoutById(id) as Workout;
      if (workout?.repeats && workout.repeats.length < 1) {
        return;
      }

      workouts.push(workout);
    });

    const workoutCounter = 0;

    return {
      doge: require('@/assets/about.png'),
      isStartedRepeat: false,
      isStartedRest: false,
      repeatTimer: 0,
      repeatTime: 0,
      restTimer: 0,
      restTime: 0,
      isShowNextRepeat: true,
      workoutPlanIsCompleted: false,
      workoutPlan,
      workoutIds,
      workouts,
      workoutCounter,
      workoutRepeatCounter: 0,
    }
  },

  computed: {
    activeWorkout() {
      const workouts = this.workouts as Workout[];
      const workoutCounter = this.workoutCounter as number;
      return workouts[workoutCounter];
    }
  },

  methods: {

    getWorkoutColor(workout: Workout) {
      const isActive = this.activeWorkout.id === workout.id;
      return isActive ? "green" : "deep-purple";
    },

    completeRepeat() {

      this.workoutRepeatCounter++;

      this.isStartedRepeat = false;
      this.isStartedRest = true;

      clearInterval(this.repeatTimer);

      const workout = this.workouts[this.workoutCounter] as Workout;
      const repeatsLength = workout.repeats.length;

      if ((repeatsLength) === this.workoutRepeatCounter) {
        this.workoutRepeatCounter = 0;
        if (!this.workouts[this.workoutCounter + 1]) {
          this.workoutPlanIsCompleted = true;
          return;
        }
        this.workoutCounter += 1;
      }

      if (this.workoutPlanIsCompleted) {

        setTimeout(() => {
          this.$store.commit('setWorkoutPlanInActive');
        }, 2000);

        return;
      }
      this.restTime = 60;
      this.restTimer = window.setInterval(() => {
        this.restTime -= 1;
      }, 1000);
    },

    startNextRepeat() {

      this.isStartedRepeat = true;
      this.isStartedRest = false;

      clearInterval(this.restTimer);

      this.repeatTime = 0;
      this.repeatTimer = window.setInterval(() => {
        this.repeatTime += 1;
      }, 1000);
    },


    decreaseRepeatCount(workout: Workout, workoutRepeatCounter: number) {
      this.$store.commit('decreaseRepeatCount', {
        workout, repeatIndex:workoutRepeatCounter
      })
    },
    increaseRepeatCount(workout: Workout, workoutRepeatCounter: number) {
      this.$store.commit('increaseRepeatCount', {
        workout, repeatIndex:workoutRepeatCounter
      })
    },
    increaseRepeat(workout: Workout, workoutRepeatCounter: number) {
      this.$store.commit('increaseRepeat', {
        workout, repeatIndex:workoutRepeatCounter
      });
    },

    decreaseRepeat(workout: Workout, workoutRepeatCounter: number) {
      this.$store.commit('increaseRepeat', {
        workout, repeatIndex:workoutRepeatCounter
      });
    },
  }
});
</script>


<template>
  <v-container>
    <v-row justify="space-around">
      <v-card
        width="100%"
        max-width="500"
      >
        <v-card-header>
          <v-card-title>{{ workoutPlan.title }}</v-card-title>
        </v-card-header>
        <div
          v-if="workoutPlanIsCompleted"
        >
          <img
            :src="doge"
            class="doge--workout-plan"
          >
        </div>


        <v-card-text>
          <template v-if="workoutPlanIsCompleted">
            <h3
              class="text-center"
              style="width: 100%"
            >
              Тренировка окончена
            </h3>
          </template>

          <template v-else>
            <v-row>
              <v-col cols="12">
                <v-timeline
                  density="compact"
                  truncate-line="none"
                >
                  <v-timeline-item
                    v-for="workout in workouts"
                    :key="workout.id"
                    :dot-color="getWorkoutColor(workout)"
                    size="x-small"
                  >
                    <div class="mb-5">
                      <div class="font-weight-normal">
                        <strong>{{ workout.title }}</strong>
                      </div>
                      <div>
                        {{ workout.description }}
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-table>
                  <tbody>
                    <tr>
                      <td colspan="3">
                        <template v-if="!workoutPlanIsCompleted">
                          <template v-if="isStartedRest && !workoutPlanIsCompleted">
                            Отдых {{ restTime }} сек
                          </template>

                          <template v-if="isStartedRepeat">
                            Время выполнения упражнения {{ repeatTime }} сек
                          </template>
                        </template>
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="3"
                      >
                        Подход {{ workoutRepeatCounter + 1 }}
                      </td>
                    </tr>

                    <tr>
                      <td
                        colspan="3"
                      >
                        вес
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 30px">
                        <v-btn
                          size="x-small"
                          @click="$store.commit('decreaseRepeat', {
                            workout:workouts[workoutCounter], repeatIndex:workoutRepeatCounter})"
                        >
                          <v-icon
                            color="red"
                          >
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </td>
                      <td>
                        <input
                          v-model="workouts[workoutCounter].repeats[workoutRepeatCounter].weight"
                          class="workout-param__input"
                          type="number"
                        >
                      </td>
                      <td style="width: 30px">
                        <v-btn
                          size="x-small"
                          @click="$store.commit('increaseRepeat', {
                            workout:workouts[workoutCounter], repeatIndex:workoutRepeatCounter})"
                        >
                          <v-icon
                            color="green"
                          >
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>

                    <tr>
                      <td colspan="3">
                        Повторения
                      </td>
                    </tr>

                    <tr>
                      <td style="width: 30px">
                        <v-btn
                          size="x-small"
                          @click="$store.commit('decreaseRepeatCount', {
                            workout:workouts[workoutCounter], repeatIndex:workoutRepeatCounter})"
                        >
                          <v-icon
                            color="red"
                          >
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </td>
                      <td>
                        <input
                          v-model="workouts[workoutCounter].repeats[workoutRepeatCounter].repeats"
                          class="workout-param__input"
                          type="number"
                        >
                      </td>
                      <td style="width: 30px">
                        <v-btn
                          size="x-small"
                          @click="$store.commit('increaseRepeatCount', {
                            workout:workouts[workoutCounter], repeatIndex:workoutRepeatCounter})"
                        >
                          <v-icon
                            color="green"
                          >
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>

              <v-col
                cols="6"
                class="workout-plan__button-container"
              >
                <div class="workout-plan__button">
                  <template v-if="!workoutPlanIsCompleted && !isStartedRepeat">
                    <v-btn
                      variant="outlined"
                      size="x-large"
                      icon
                      color="primary"
                      @click="startNextRepeat"
                    >
                      <v-icon>mdi-play</v-icon>
                    </v-btn>
                  </template>

                  <template v-if="isStartedRepeat">
                    <v-btn
                      variant="outlined"
                      size="x-large"
                      icon
                      color="primary"
                      @click="completeRepeat"
                    >
                      <v-icon>mdi-stop</v-icon>
                    </v-btn>
                  </template>
                </div>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.doge--workout-plan {
  top: -25px;
  height: 400px;
  max-width: 100%;
  overflow: hidden;
  animation: see-doge 5000ms;
}

@keyframes see-doge {
  0% {
    top: 150px;
  }
  5% {
    top: 0;
  }
  30% {
    top: -25px;
  }

  75% {
    top:-50px;
  }

  100% {
    top:-25px;
  }
}


.workout-plan__button-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.workout-plan__button {
  margin: 0 auto;
}


.workout-param__input {
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  color: white;
  width: 100%;
  height: 100%;

}

.workout-param__input:focus {
  outline: gray
}

.workout-param__description {
  width: 120px;
}

.v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 0px 4px;
  transition: height cubic-bezier(0.4, 0, 0.2, 1);
}


</style>



