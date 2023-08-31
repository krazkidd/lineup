import { defineNuxtPlugin } from '#app';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(ToastService);

    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Toast', Toast);
});
