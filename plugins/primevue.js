import { defineNuxtPlugin } from '#app';

import PrimeVue from 'primevue/config';
import Tailwind from 'primevue/passthrough/tailwind';

import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import ColorPicker from 'primevue/colorpicker';
import Dialog from 'primevue/dialog';
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';
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
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Checkbox', Checkbox);
    nuxtApp.vueApp.component('ColorPicker', ColorPicker);
    nuxtApp.vueApp.component('Dialog', Dialog);
    nuxtApp.vueApp.component('Inplace', Inplace);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Listbox', Listbox);
    nuxtApp.vueApp.component('Menu', Menu);
    nuxtApp.vueApp.component('Sidebar', Sidebar);
    nuxtApp.vueApp.component('Toast', Toast);
});
