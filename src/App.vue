<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import routes from "@/router/routes";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  methods: {},
  data() {
    return {
      drawer: false,
      doge: require('@/assets/doge.png'),
      routes
    }
  },
})
</script>

<style lang="scss">
@import './styles/main';
</style>

<template>
  <v-theme-provider theme="dark" withBackground="true">
    <v-app>

      <v-main>
        <v-navigation-drawer
          v-model="drawer"
          temporary
          fixed
        >
          <v-list-item>
            <v-avatar>
              <img width="100%" height="100%" :class=" drawer ? 'doge-logo--animation-rotation' : ''" :src="doge"
                   alt="doge-logo"/>
            </v-avatar>
            <v-list-item-title class="doge-logo__title">Dogegym</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <nav>
            <v-list density="compact" nav>
              <router-link v-for="route in routes" custom v-slot="{ isActive, href, navigate }" :to="route.path">
                <v-list-item :active="isActive" :href="route.path" @click="navigate" :prepend-icon="route.icon"
                             :title="route.name"></v-list-item>
              </router-link>
            </v-list>
          </nav>
        </v-navigation-drawer>

        <router-view/>
      </v-main>

      <v-app-bar
        color="default"
        position="bottom"
      >
        <div class="justify-center" style="margin: 0 auto">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>
      </v-app-bar>

    </v-app>
  </v-theme-provider>
</template>
