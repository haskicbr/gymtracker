<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const deleteWorkout = (id: string) => {
  store.commit('deleteWorkout', id);
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="workout in store.state.workouts"
        :key="workout.id"
        md="3"
        lg="2"
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
