const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: true,
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
  },
  pwa: {
    name: 'Gymtracker app',
    short_name: 'Gymtracker app',
    InjectManifest: "InjectManifest",
    iconPaths: {
      faviconSVG: null,
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/android-chrome-192x192.png',
      maskIcon: null,
      msTileImage: 'img/icons/android-chrome-192x192.png'
    }
  },

  chainWebpack: config => {
    config.output
      .filename(`js/[name].[contenthash:8].${Date.now()}.js?date=${Date.now()}`)
      .chunkFilename(`js/[name].[contenthash:8].${Date.now()}.js?date=${Date.now()}`)
  },

  css: {
    extract: {
      filename: `css/[name].[contenthash:8].${Date.now()}.css`,
      chunkFilename: `css/[id].${Date.now()}.css`
    }
  }

});

