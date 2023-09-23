import VueQrcode from 'vue-qrcode';

//TODO this yields the warning 'A plugin must either be a function or an object with an "install" function.'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueQrcode);

  nuxtApp.vueApp.component('VueQrcode', VueQrcode);
});