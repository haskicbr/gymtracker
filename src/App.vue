<script lang="ts">
import { defineComponent } from 'vue';
import routes from "@/router/routes";

export default defineComponent({
  name: 'App',

  data() {
    return {
      drawer: false,
      doge: require('@/assets/doge.png'),
      routes
    }
  },
  methods: {},
})
</script>

<style lang="scss">
@import './styles/main';
</style>

<template>
  <v-theme-provider
    theme="dark"
    :with-background="true"
  >
    <v-app>
      <v-main>
        <v-navigation-drawer
          v-model="drawer"
          temporary
          fixed
        >
          <v-list-item>
            <v-avatar>
              <img
                width="100%"
                height="100%"
                :class=" drawer ? 'doge-logo--animation-rotation' : ''"
                :src="doge"
                alt="doge-logo"
              >
            </v-avatar>
            <v-list-item-title class="doge-logo__title">
              Dogegym
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <nav>
            <v-list
              density="compact"
              nav
            >
              <router-link
                v-for="route in routes"
                :key="route.name"
                v-slot="{ isActive, href, navigate }"
                custom
                :to="route.path"
              >
                <v-list-item
                  v-if="route.isMainMenu"
                  :active="isActive"
                  :href="route.path"
                  :prepend-icon="route.icon"
                  :title="route.name"
                  @click="navigate"
                />
              </router-link>
            </v-list>
          </nav>
        </v-navigation-drawer>
        <router-view />
      </v-main>

      <v-app-bar
        color="default"
        position="bottom"
      >
        <div
          class="justify-center"
          style="margin: 0 auto"
        >
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          />
        </div>
      </v-app-bar>
    </v-app>
  </v-theme-provider>
</template>
