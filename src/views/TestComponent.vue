<script lang="ts">

import TestInput from "@/components/test-components/TestInput.vue";

import { defineComponent } from 'vue'
import { StateCSVService } from "@/services";

export default defineComponent({
  name: "TestComponent",

  components: {
    TestInput
  },

  data() {

    return {
      user: {
        name: 'user-name',
        password: 'user-password'
      }
    }
  },
  methods: {
    testEventEmit() {
      (<HTMLElement>this.$refs.testEventRef).innerHTML = (new Date()).toString();
    },


    async sendTestRequest() {
      const response = await StateCSVService.uploadState(this.$store.state);


      console.log(response);
    }
  }

});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>test component</h1>


        <h4>{{ user }}</h4>

        <h4 ref="testEventRef">
          null
        </h4>
        <input
          v-model="user.name"
          class="test-input"
          type="text"
          @input="user.name = user.name"
        >

        <TestInput
          v-model="user.name"
          v-model:title="user.password"
          @testEvent="testEventEmit"
        />


        <v-btn @click="sendTestRequest">
          send REQUEST
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.test-input {
  background: wheat;
  color: gray;
}
</style>


