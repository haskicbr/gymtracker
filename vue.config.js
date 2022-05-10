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
    name: 'Dogegym app',
    short_name: 'Dogegym app',
    InjectManifest: "InjectManifest"
  }
});

