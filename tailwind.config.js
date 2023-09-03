import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  // make compatible with @nuxtjs/color-mode module
  darkMode: 'class',
  // scan for PrimeVue styles
  content: [
    // these don't match our Nuxt app--do we need them? (we could include components/, layouts/, pages/, etc.)
    //"./index.html",
    //"./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
};