<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="about text-center">
          <div class="logo__title__container">
            <h1 class="text-center logo__title text-uppercase">
              Gymtracker - to be strong
            </h1>
          </div>
        </div>

        <p class="text-center">
          Это приложение поможет записывать ваши тренировочки
        </p>

        <p class="text-center">
          Выгружать результаты в exel таблицы, изменять  и загружать их обратно
        </p>

        <p class="text-center" style="display: none">
          <a
            href="https://t.me/dogegymapp"
            target="_blank"
            class="text-blue text-decoration-none"
          >Мы в телеграмм <v-icon>mdi-telegram</v-icon></a>
        </p>
        <br>

        <pre class="text-center" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        offset-lg="4"
        lg="4"
      >
        <div class="home">
          <div class="quotes">
            <h3 class="text-left">
              Yesterday I thought tomorrow would be today
            </h3>
            <h3 class="text-right">
              Not everyone can look to tomorrow
            </h3>
          </div>

          <div class="logo__overflow">
            <img
              class="logo--home-page"
              :src="doge"
              alt="doge-logo"
            >
          </div>


          <div class="quotes">
            <h3 class="text-right">
              Today is not my day...
            </h3>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" setup>
const doge  = require('@/assets/about.png');
</script>

<style lang="scss">
@import '@/styles/about.scss';
</style>
