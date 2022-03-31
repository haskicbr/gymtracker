<template>
  <v-theme-provider theme="dark" withBackground="true">
    <v-app>
      <v-app-bar
        color="default"

        position="bottom"
      >
        <div class="justify-center" style="margin: 0 auto">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>
      </v-app-bar>


      <v-main>
        <v-navigation-drawer
          v-model="drawer"
          temporary
          fixed
        >
          <v-list-item
            class=""


          >
            <v-avatar>
              <img width="100%" height="100%" :class=" drawer ? 'doge-logo--animation-rotation' : ''  " :src="doge"
                   alt="doge-logo"/>
            </v-avatar>

            <v-list-item-title class="doge-logo__title">Dogegym</v-list-item-title>
          </v-list-item>


          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-card height="200px"></v-card>
        <v-card title="Title" subtitle="Subtitle"></v-card>


        <HelloWorld @click="test()"/>
      </v-main>


    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
  },

  methods: {},
  data() {
    return {
      drawer: null,
      doge: require('./assets/doge.png')
    }
  },
})
</script>


<style lang="scss">
@import './styles/main';

</style>
