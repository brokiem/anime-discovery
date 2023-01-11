import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import './assets/main.css'

const app = createApp(App);

const store = createStore({
    state() {
        return {
            loading: null,
            anime: {}
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setAnime(state, payload) {
            state.anime = payload;
        }
    }
});

app.use(store);

app.mount('#app');
