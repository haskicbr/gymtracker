<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "TestInput",

  props: {

    modelValue: {
      type: String,
      required: true,

    },
    title: {
      type: String,
      required: true,
    }
  },
  emits: ['update:modelValue', 'update:title', 'testEvent'],
  data() {
    return {}
  },

  methods: {
    updateInput(event: InputEvent) {
      let value = (<HTMLInputElement>event.target).value;
      this.$emit('update:modelValue', value);
    },
    updateTitle(event: InputEvent) {
      let value = (<HTMLInputElement>event.target).value;
      this.$emit('update:title', value);
    }
  }

});
</script>

<template>
  <div>
    {{ modelValue }}

    <h1>model value: {{ modelValue }}</h1>

    <input
      type="text"
      :value="modelValue"
      @input="updateInput"
    >
    <h1>title: {{ title }}</h1>

    <input
      type="text"
      :value="title"
      @input="updateTitle"
    >
    <v-btn @click="$emit('testEvent')">
      test-event click
    </v-btn>
  </div>
</template>
