// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // some people report having issues with devtools
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-primevue",
    "nuxt-vuefire"
  ],
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/common.css',
  ],
  app: {
    // overriden by NUXT_APP_BASE_URL envvar
    // see https://nuxt.com/docs/api/composables/use-runtime-config#appbaseurl
    //baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'lineup',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: (process.env.NUXT_APP_BASE_URL || '/') + 'favicon/favicon.ico'
        }
      ]
    }
  },
  colorMode: {
    // make compatible with @nuxtjs/tailwindcss module
    classSuffix: '',
  },
  // nitro: {
  //   // prefer to set this in build environment
  //   preset: '',
  //   // copy local files to build output
  //   publicAssets: [
  //     {
  //       baseURL: "node_modules/...",
  //       dir: "public/images",
  //       maxAge: 60 * 60 * 24 * 7, // 7 days
  //     },
  //   ]
  // },
  primevue: {
    options: {
      ripple: true,
      // use Tailwind styles
      unstyled: true,
    },
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  vuefire: {
    emulators: {
      // uncomment this line to run the application in production mode without emulators during dev
      //enabled: false,
    },
    config: {
      apiKey: "AIzaSyDWIA7B4lYdJ3ZqG3YdvEtpVdmWoSLS4w0",
      authDomain: "lineup-d5a4d.firebaseapp.com",
      projectId: "lineup-d5a4d",
      storageBucket: "lineup-d5a4d.appspot.com",
      messagingSenderId: "540144972644",
      appId: "1:540144972644:web:dd7b271978a32ccc210071"
    }
  },
})
