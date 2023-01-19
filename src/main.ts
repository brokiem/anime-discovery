import { createApp } from 'vue';
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';

import App from './App.vue';
import './assets/main.css';
import store from "./store";

registerSW({ immediate: true });

const app = createApp(App);

app.use(store);

app.mount('#app');
