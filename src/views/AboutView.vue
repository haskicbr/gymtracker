<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="about text-center">
          <h1>Приложение dogegym</h1>
        </div>

        <p class="text-center">
          Это приложение поможет записывать все спортивные достижения
        </p>

        <p class="text-center">
          Выгружать результаты в exel таблицы, изменять их и загружать их обратно
        </p>

        <br>
        <p class="text-center">
          Ничего лишнего, только тренировки и DOGE
        </p>
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
          <div class="logo__title__container">
            <h1 class="text-center logo__title">
              DOGE GYM - TO BE STRONG
            </h1>
          </div>

          <div class="quotes">
            <h3 class="text-left">
              Yesterday I thought tomorrow would be today
            </h3>
            <h3 class="text-right">
              Not everyone can look to tomorrow
            </h3>
            <h3 class="text-center">
              No one will ever come back in 2007
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


<script lang="ts" setup >
const doge  = require('@/assets/about.png');
</script>

<style lang="scss">
.logo--home-page {
  width: 100%;
  transform: rotate(0deg);
}

.logo__overflow {
  height: 150px;
  overflow: visible;
}

.logo--home-page {
  position: relative;
  animation: spin-logo-image 1250ms infinite;
  max-width: 100%;
  width: 100%;
  transform: rotate(0deg);
}

.logo__title {
  padding-left: 10px;
  animation: color-logo 1250ms infinite, spin-logo-image--text-transform 1250ms infinite alternate;

  &__container {
    height: 30px;
  }
}


@keyframes color-logo {

  0% {
    color: white;
  }

  50% {
    color: #a97346;
  }

  100% {
    color: white;
  }

}
@keyframes spin-logo-image--text-transform {
  0% {
    font-size: 20px;
  }
  100% {
    font-size: 34px;
  }
}

@keyframes spin-logo-image {
  0% {
    transform: rotate(3deg);
  }

  50% {
    transform: rotate(-3deg);
  }

  100% {
    transform: rotate(3deg);
  }
}

.quotes {
  margin-top: 10px;
  :nth-child(1) {
    transform: rotate(5deg);
    animation: color-logo 3500ms infinite;
  }
  :nth-child(2) {
    margin-top: 10px;
    transform: rotate(-3deg);
    animation: color-logo 1500ms infinite;
  }
  :nth-child(3) {
    margin-top: 10px;
    transform: rotate(2deg);
    animation: color-logo 350ms infinite;
  }
}

</style>
