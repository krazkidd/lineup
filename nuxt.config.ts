// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt"
  ],
  // HACK: We have to disable SSR until Pinia has better
  //       support for our usage. See stores/AppSettings.ts.
  ssr: false,
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  app: {
    // required for GitHub deployment
    baseURL: '/lineup/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'lineup',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/lineup/favicon.ico'
        }
      ]
    }
  },
  build: {
    transpile: ['primevue']
  },
  colorMode: {
    // make compatible with @nuxtjs/tailwindcss module
    classSuffix: '',
  },
})
