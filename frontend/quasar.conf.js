/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { configure } = require("quasar/wrappers");

module.exports = configure((ctx) => ({
  // https://quasar.dev/quasar-cli/supporting-ts
  supportTS: {
    tsCheckerConfig: {
      eslint: true
    }
  },

  // https://quasar.dev/quasar-cli/prefetch-feature
  // preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://quasar.dev/quasar-cli/boot-files
  boot: [
    "composition-api",
    "i18n",
    "axios"
  ],

  // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
  css: [
    "app.scss"
  ],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    // 'ionicons-v4',
    "mdi-v5",
    // 'fontawesome-v5',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

    "roboto-font" // optional, you are not bound to it
    // 'material-icons', // optional, you are not bound to it
  ],

  // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
  build: {
    vueRouterMode: "history", // available values: 'hash', 'history'
    env: {
      BASEURL: process.env.BASEURL || "http://localhost"
    },

    // transpile: false,

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: false, // https://quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,

    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,

    // https://quasar.dev/quasar-cli/handling-webpack
    extendWebpack (cfg) {
      // linting is slow in TS projects, we execute it only for production builds
      if (ctx.prod) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        });
      }

      cfg.resolve.alias = {
        ...cfg.resolve.alias,
        "@components": path.resolve(__dirname, "src/components/"),
        "@icons": path.resolve(__dirname, "src/icons/"),
        "@store": path.resolve(__dirname, "src/store/"),
        "@mixins": path.resolve(__dirname, "src/mixins/"),
        "@assets": path.resolve(__dirname, "src/assets/"),
      };
    }
  },

  // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
  devServer: {
    https: false,
    port: ctx.mode.spa
      ? 8080
      : 8081,
    open: true, // opens browser window automatically
    proxy: {
      // proxy all requests starting with /api to the backend
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: false
      },
      // proxy all requests starting with /socket.io to the backend
      "/socket.io": {
        target: "http://localhost:3000",
        changeOrigin: false,
        ws: true
      }
    }
  },

  // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
  framework: {
    iconSet: "mdi-v5", // Quasar icon set
    lang: "en-us", // Quasar language pack
    config: {
      dark: "auto"
    },

    // Possible values for "importStrategy":
    // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
    // * 'all'  - Manually specify what to import
    importStrategy: "auto",

    // For special cases outside of where "auto" importStrategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: ["Notify", "Dialog"]
  },

  // animations: 'all', // --- includes all animations
  // https://quasar.dev/options/animations
  animations: [
    "fadeIn",
    "fadeOut"
  ],

  // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
  ssr: {
    pwa: false
  },

  // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
  pwa: {
    workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
    workboxOptions: {}, // only for GenerateSW
    manifest: {
      name: "kCharge",
      short_name: "kCharge",
      description: "A battery testing and management platform",
      display: "standalone",
      orientation: "portrait",
      background_color: "#ffffff",
      theme_color: "#027be3",
      icons: [
        {
          src: "icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png"
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "icons/icon-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  },

  // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
  cordova: {
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true
  },

  // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
  electron: {
    bundler: "packager", // 'packager' or 'builder'

    packager: {
      arch: ["arm64", "x64"],
      platform: ["darwin", "win32"],
      appCopyright: "Jaimyn Mayer 2020",
      appCategoryType: "public.app-category.developer-tools",
      osxSign: {
        identity: "LM4YQR3WT4"
      }

      // Windows only
      // win32metadata: { ... }
    },

    // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
    nodeIntegration: true,

    extendWebpack (/* cfg */) {
      // do something with Electron main process Webpack cfg
      // chainWebpack also available besides this extendWebpack
    }
  }
}));
