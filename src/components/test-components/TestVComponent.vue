<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "TestVComponent",

  data() {
    return {
      test: 'test data'
    }
  },
});
</script>

<template>
  <div>
    <h4>{{ test }}</h4>
    <v-text-field
      v-model="test"
      label="Описание"
    />
  </div>
</template>
