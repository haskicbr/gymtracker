<script lang="ts">
import { defineComponent } from "vue";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm.vue";
import { useRoute } from "vue-router";
import { Workout } from "@/typings/interfaces";

export default defineComponent({
  name: "WorkoutPlan",
  components: {},

  data() {

    const id = this.$route.params.id;

    const workoutPlan = this.$store.getters.getWorkoutPlanById(id);
    const workoutIds = workoutPlan.workouts.map(e => e.id);
    const workouts: Workout[] = [];

    workoutIds.forEach(id => {
      const workout = this.$store.getters.getWorkoutById(id) as Workout;
      workouts.push(workout);
    });

    const workoutCounter = 0;


    const repeatTimer: any = null;

    return {
      doge: require('@/assets/about.png'),
      isStartedRepeat: false,
      isStartedRest: false,
      repeatTimer,
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

      this.restTimer = 2;

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
        return;
      }
      this.restTime = 60;
      this.restTimer = setInterval(() => {
        this.restTime -= 1;
      }, 1000);
    },

    startNextRepeat() {

      this.isStartedRepeat = true;
      this.isStartedRest = false;

      clearInterval(this.restTimer);

      this.repeatTime = 0;
      this.repeatTimer = setInterval(() => {
        this.repeatTime += 1;
      }, 1000);
    }
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
        <div
          v-if="workoutPlanIsCompleted"
          style="height: 175px"
        >
          <img

            :src="doge"
            class="doge--workout-plan"
          >
        </div>
        <v-card-title>{{ workoutPlan.title }}</v-card-title>

        <v-card-text>
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
              <div class="mb-15">
                <div class="font-weight-normal">
                  <strong>{{ workout.title }}</strong>
                </div>
                <div>
                  {{ workout.description }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>

          <template v-if="!workoutPlanIsCompleted">
            <div class="text-h6">
              Подход {{ workoutRepeatCounter +1 }}
            </div>
            <div class="text-h6">
              Количество повторений {{ workouts[workoutCounter].repeats[workoutRepeatCounter].repeats }}
            </div>

            <div class="text-h6">
              Вес {{ workouts[workoutCounter].repeats[workoutRepeatCounter].weight }} КГ
            </div>

            <template v-if="isStartedRest && !workoutPlanIsCompleted">
              <h3>
                Отдых {{ restTime }} сек
              </h3>
            </template>
          </template>



          <template v-if="isStartedRepeat">
            <h3>
              Время выполнения упражнения {{ repeatTime }} сек
            </h3>
          </template>
        </v-card-text>

        <v-card-actions>
          <h3
            v-if="workoutPlanIsCompleted "
            class="text-center"
            style="width: 100%"
          >
            Тренировка окончена
          </h3>

          <v-btn
            v-if="!workoutPlanIsCompleted && !isStartedRepeat"
            @click="startNextRepeat"
          >
            Начать подход
          </v-btn>

          <v-btn
            v-if="isStartedRepeat"
            @click="completeRepeat"
          >
            Закончить подход
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.doge--workout-plan {
  top: -25px;
  position: absolute;
  height: 500px;
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


$a : 14px;

/*

@media screen and (min-width: 1280px) {
  * {
    font-size: 30px !important;
  }
}

* {
  font-size: $a;
}*/


</style>



