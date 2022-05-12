<script lang="ts">
import { defineComponent } from 'vue'
import { ConvertStateService } from "@/services";
import { DogeGymState } from "@/typings/interfaces";

export default defineComponent({
  name: "ImportExport",
  data() {
    return {
      user: {
        name: 'user-name',
        password: 'user-password'
      },
      fileData: []
    }
  },
  methods: {
    testEventEmit() {
      (<HTMLElement>this.$refs.testEventRef).innerHTML = (new Date()).toString();
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


      console.log({state})


      const newState = {...this.$store.state, ...state};

      console.log({newState})

      this.$store.replaceState({...this.$store.state, ...state} as DogeGymState);


      this.$router.push({ path: '/workout-plans' })

    },


    async downloadCSV() {
      const response = await ConvertStateService.convertToCSV(this.$store.state);
      const csv = response.data as BlobPart;
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
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

