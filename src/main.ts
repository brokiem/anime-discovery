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
            recommendations: [],
            hasScrollbar: false
        }
    },
    mutations: {
        setLoading(state, payload) {
            window.document.title = "Anime Discovery";

            state.loading = payload;
        },
        setAnime(state, payload) {
            payload.synopsis = payload.synopsis.replaceAll('[Written by MAL Rewrite]', '').replace(/\n+$/, '').replaceAll('\n', '<br>')

            state.anime = payload;

            const englishTitle = payload.englishTitle.length > 0 ? `(${payload.englishTitle})` : '';
            window.document.title = `${payload.title} ${englishTitle} | Anime Discovery`;
            document.querySelector('meta[name="description"]')?.setAttribute("content", payload.synopsis);
        },
        setHasScrollbar(state, payload) {
            state.hasScrollbar = payload;
        },
        setRecommendations(state, payload) {
            state.recommendations = payload;
        }
    }
});

app.use(store);

app.mount('#app');
