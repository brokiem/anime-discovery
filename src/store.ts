import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            loading: null,
            anime: {},
            recommendations: [],
            recommendationLoading: null,
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
            payload.genres = payload.genres.filter((genre: any) => genre)

            state.anime = payload;

            const englishTitle = payload.englishTitle.length > 0 ? ` (${payload.englishTitle})` : '';
            window.document.title = `${payload.title}${englishTitle} - Anime Discovery`;
            document.querySelector('meta[name="description"]')?.setAttribute("content", payload.synopsis);
        },
        setHasScrollbar(state, payload) {
            state.hasScrollbar = payload;
        },
        setRecommendations(state, payload) {
            state.recommendations = payload;
        },
        setRecommendationLoading(state, payload) {
            state.recommendationLoading = payload;
        }
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isRecommendationLoading(state) {
            return state.recommendationLoading;
        }
    }
});

export default store;
