import { createApp } from 'vue'
import { createStore } from 'vuex'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import './assets/main.css'

registerSW({ immediate: true })

const app = createApp(App);

const store = createStore({
    state() {
        return {
            loading: null,
            anime: {},
            hasScrollbar: false
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setAnime(state, payload) {
            payload.synopsis = payload.synopsis.replaceAll('[Written by MAL Rewrite]', '').replace(/\n+$/, '').replaceAll('\n', '<br>')

            state.anime = payload;
        },
        setHasScrollbar(state, payload) {
            state.hasScrollbar = payload;
        }
    }
});

app.use(store);

app.mount('#app');
