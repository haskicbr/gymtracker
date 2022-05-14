<script lang="ts">
import { defineComponent } from 'vue'
import { ConvertStateService, ShareService } from "@/services";
import { DogeGymState } from "@/typings/interfaces";

export default defineComponent({
  name: "ImportExport",
  data() {
    return {
      user: {
        name: 'user-name',
        password: 'user-password'
      },
      fileData: [],
      snackbar: false,
      sharedLink: ''
    }
  },
  methods: {
    async createShareLink() {

      const link = await ShareService.createLink(this.$store.state);
      const uid = link.data.uid;

      const route = this.$router.resolve({
        name: 'stateFromSharedLink',
        params: {
          uid
        }
      });

      const absoluteURL = new URL(route.href, window.location.href).href;
      this.sharedLink = absoluteURL;
      await navigator.clipboard.writeText(absoluteURL);
      this.snackbar = true;
    },

    async readFileContent(file: File): Promise<string> {
      const fileReader = new FileReader();

      fileReader.readAsText(file, "UTF-8");

      return new Promise((resolve, reject) => {
        fileReader.onload = function (event: ProgressEvent<FileReader>) {

          console.log(typeof (event?.target?.result))

          if (typeof (event?.target?.result) === 'string') {
            return resolve(event?.target?.result);
          }
          return reject("Empty file content");
        };
      });
    },

    async uploadCSV(data: any) {

      const file: File = data[0] as File;
      const csvContent = await this.readFileContent(file);
      const state: DogeGymState = await ConvertStateService.convertToState(csvContent);
      this.$store.replaceState({...this.$store.state, ...state} as DogeGymState);
      this.$router.replace({ path: '/workout-plans' })
    },

    async downloadCSV() {
      const response = await ConvertStateService.convertToCSV(this.$store.state);
      const csv = "\uFEFF" + response.data as BlobPart;
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf8' }));
      a.download = 'План тренировок.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    }
  }

});
</script>
<template>
  <v-container style="max-width: 600px">
    <v-row>
      <v-col cols="12">
        <v-btn
          class="v-btn--block"
          @click="downloadCSV"
        >
          Скачать план тренировок
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn
          class="v-btn--block"
          @click="createShareLink"
        >
          Получить ссылку на план тренировок
        </v-btn>

        <div class="text-center ma-2">
          <v-snackbar
            v-model="snackbar"
            :top="true"
          >
            <div class="text-white">
              Ссылка скопирована {{ sharedLink }}
            </div>

            <template #actions>
              <v-btn
                color="primary"
                variant="text"
                @click="snackbar = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </v-col>

      <v-col cols="12">
        <v-file-input
          ref="fileLoad"
          show-size
          counter
          multiple
          label="Загрузить план тренировок"
          accept="text/csv"
          @update:modelValue="uploadCSV"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

