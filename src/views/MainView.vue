<template>
  <div id="mprogress" class="mprogress-visible" style="height: 2px !important;"></div>

  <div class="flex content-center justify-center">
    <div class="mt-10 w-full max-w-5xl text-white">
      <SearchInput/>

      <div class="mt-8">
        <Transition>
          <Ambient v-if="($store.state.loading !== null && !$store.state.loading)" image-element-name="anime-cover-image"/>
        </Transition>

        <Skeleton v-if="($store.state.loading !== null && $store.state.loading)"/>
        <Anime v-if="($store.state.loading !== null && !$store.state.loading)"/>

        <h1 v-if="$store.state.loading === null" class="text-center text-gray-900 dark:text-white mx-5">
          Welcome to brokiem's Anime discovery!<br>
          Start searching for anime with the search button above.
        </h1>

        <div v-if="$store.state.loading === null" class="mt-12">
          <Recommendations/>
        </div>
      </div>
    </div>
  </div>

  <div class="pb-20"></div>

  <Footer/>
</template>

<script>
import Skeleton from "@/components/Skeleton.vue";
import Anime from "@/components/Anime.vue";
import SearchInput from "@/components/SearchInput.vue";
import {getAnimeDetails} from "@/assets/mal";
import {useStore} from "vuex";
import Footer from "@/components/Footer.vue";
import Recommendations from "@/components/Recommendations.vue";
import Ambient from "@/components/Ambient.vue";
import {computed} from "vue";
import 'material-progress-bar/mprogress.css';

export default {
  name: "MainView",
  components: {Ambient, Recommendations, Footer, SearchInput, Anime, Skeleton},
  setup() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeTitle = urlParams.get("anime");
    const store = useStore();

    if (animeTitle !== null) {
      store.commit("setLoading", true);

      getAnimeDetails(animeTitle)
          .then((response) => {
            store.commit("setLoading", false);
            store.commit("setAnime", response);
          })
          .catch((error) => {
            store.commit("setLoading", false)
            console.log(error);
          });
    }

    return {
      animeTitle,
      isLoading: computed(() => store.state.loading),
      isRecommendationLoading: computed(() => store.state.recommendationLoading),
      setHasScrollbar: (hasScrollbar) => store.commit("setHasScrollbar", hasScrollbar)
    }
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue) {
        document.getElementById('mprogress').classList.remove('mprogress-hidden');
        document.getElementById('mprogress').classList.add('mprogress-visible');
      } else {
        document.getElementById('mprogress').classList.remove('mprogress-visible');
        document.getElementById('mprogress').classList.add('mprogress-hidden');
      }

      setTimeout(() => {
        this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));
      }, 1);
    },
    isRecommendationLoading(newValue, oldValue) {
      if (newValue) {
        document.getElementById('mprogress').classList.remove('mprogress-hidden');
        document.getElementById('mprogress').classList.add('mprogress-visible');
      } else {
        document.getElementById('mprogress').classList.remove('mprogress-visible');
        document.getElementById('mprogress').classList.add('mprogress-hidden');
      }
    },
  }
}
</script>

<style scoped>
.v-leave-active {
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.v-leave-to {
  opacity: 0;
}
</style>
