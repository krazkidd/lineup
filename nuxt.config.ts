// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt"
  ],
  // don't reenable this until our Pinia
  // stores support universal rendering
  ssr: false,
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  build: {
    transpile: ['primevue']
  },
  colorMode: {
    // make compatible with @nuxtjs/tailwindcss module
    classSuffix: '',
  },
})
