<script lang="ts">

import { defineComponent } from "vue";

import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";

import { Workout, WorkoutRepeat } from "@/typings/interfaces";


export default defineComponent({
  data() {

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const id = route.params.id;

    let workout;

    if (id) {
      workout = store.state.workouts.find((e: Workout) => e.id === id);
    }

    if (typeof (workout) === 'undefined') {
      workout = {
        id: '',
        title: '',
        description: '',
        repeats: []
      } as Workout;

      store.commit('addWorkout', workout);
      workout = this.$store.state.workouts.find((e: Workout) => e.id === id) as Workout;

    } else {
      workout = workout as Workout;
    }

    const workoutModel = workout;
    const workoutRepeats = workout.repeats;
    let newRepeatWeight = 1;
    return {
      workout,
      workoutModel,
      workoutRepeats,
      store,
      router,
      newRepeatWeight
    }
  },

  methods: {
    addRepeat(workoutModel: Workout) {

      let weight = 5;
      let repeats = 10;

      if (workoutModel.repeats.length > 0) {
        const lastRepeatsIndex = workoutModel.repeats.length - 1;
        weight = workoutModel.repeats[lastRepeatsIndex].weight;
        repeats = workoutModel.repeats[lastRepeatsIndex].repeats;
      }

      this.$store.commit('addRepeat', {
        workout: workoutModel, repeat: {
          weight,
          repeats
        }
      })
    }
  }

});

</script>


<template>
  <v-card
    class="mx-auto mt-10"
    max-width="400"
    tile
  >
    <v-card-content>
      <v-text-field
        v-model="workoutModel.title"
        color="primary"
        label="Название упражнения"
      />

      <v-text-field
        v-model="workoutModel.description"
        color="primary"
        label="Описание"
      />
      <div>
        Подходы:
        <v-btn
          @click="addRepeat(workoutModel)"
        >
          +
        </v-btn>

        <template v-if="workoutRepeats.length > 0">
          <v-btn
            style="margin-left: 10px"
            @click="$store.commit('deleteRepeat', {workout:workoutModel, repeatIndex:workoutRepeats.length-1})"
          >
            -
          </v-btn>
        </template>


        <br>
        <br>
        <v-table>
          <thead>
            <tr>
              <th
                colspan="3"
                class="text-center"
              >
                вес
              </th>
              <th
                colspan="3"
                class="text-center"
              >
                повторения
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(repeat, index) in workoutRepeats"
              :key="index"
            >
              <tr>
                <td style="width: 30px">
                  <v-btn
                    size="x-small"
                    @click="$store.commit('decreaseRepeat', {workout:workoutModel, repeatIndex:index})"
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
                    v-model="repeat.weight"
                    class="workout-param__input"
                    type="number"
                  >
                </td>
                <td style="width: 30px">
                  <v-btn
                    size="x-small"
                    @click="$store.commit('increaseRepeat', {workout:workoutModel, repeatIndex:index})"
                  >
                    <v-icon
                      color="green"
                    >
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </td>

                <td style="width: 30px">
                  <v-btn
                    size="x-small"
                    @click="$store.commit('decreaseRepeatCount', {workout:workoutModel, repeatIndex:index})"
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
                    v-model="repeat.repeats"
                    class="workout-param__input"
                    type="number"
                  >
                </td>
                <td style="width: 30px">
                  <v-btn
                    size="x-small"
                    @click="$store.commit('increaseRepeatCount', {workout:workoutModel, repeatIndex:index})"
                  >
                    <v-icon
                      color="green"
                    >
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </div>
    </v-card-content>
  </v-card>
</template>


<style lang="scss" scoped>

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
