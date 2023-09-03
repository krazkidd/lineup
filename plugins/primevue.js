import { defineNuxtPlugin } from '#app';

import PrimeVue from 'primevue/config';
import Tailwind from 'primevue/passthrough/tailwind';

import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import Toast from 'primevue/toast';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        // use Tailwind styles
        unstyled: true,
        pt: Tailwind
    });

    nuxtApp.vueApp.use(ConfirmationService);
    nuxtApp.vueApp.use(ToastService);

    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Dialog', Dialog);
    nuxtApp.vueApp.component('Inplace', Inplace);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Listbox', Listbox);
    nuxtApp.vueApp.component('Toast', Toast);
});
