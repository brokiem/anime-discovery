<template>
  <div class="marquee rounded-md mx-5">
    <div class="marquee-content" :style="{'animation-duration': $store.state.recommendations.length * 1500 + 'ms'}">
      <div v-for="anime in $store.state.recommendations">
        <div class="marquee-tag w-[225px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10">
          <a :href="'?anime=' + anime.animeLink.split('/')[anime.animeLink.split('/').length - 1].replaceAll('_', '+')">
            <img class="rounded-md h-[332px]" :title="anime.anime" :src="anime.pictureImage.replace('r/50x70/', '').split('?')[0].split('#')[0]" alt="" />
          </a>

<!--          <div class="vignette absolute bottom-2 rounded-b-md w-full py-1 max-w-[210px]"></div>-->
        </div>

        <h1 class="text-center text-gray-900 dark:text-white w-full mt-1 mx-auto text max-w-[210px]">
          {{anime.anime}}
        </h1>
      </div>

      <div v-if="$store.state.recommendationLoading" class="marquee-tag animate-pulse w-[225px] h-[350px] bg-white rounded-md shadow-sm dark:bg-grey"></div>
      <div v-if="$store.state.recommendationLoading" class="marquee-tag animate-pulse w-[225px] h-[350px] bg-white rounded-md shadow-sm dark:bg-grey"></div>
      <div v-if="$store.state.recommendationLoading" class="marquee-tag animate-pulse w-[225px] h-[350px] bg-white rounded-md shadow-sm dark:bg-grey"></div>
      <div v-if="$store.state.recommendationLoading" class="marquee-tag animate-pulse w-[225px] h-[350px] bg-white rounded-md shadow-sm dark:bg-grey"></div>
      <div v-if="$store.state.recommendationLoading" class="marquee-tag animate-pulse w-[225px] h-[350px] bg-white rounded-md shadow-sm dark:bg-grey"></div>
    </div>
  </div>

  <div v-if="!$store.state.recommendationLoading && $store.state.recommendations.length <= 0" class="mx-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="ml-1">No recommendations found.</span>
  </div>
</template>

<script>
import {getAnimeRecommendationsByName} from "@/assets/mal";
import {useStore} from "vuex";
import {getTopAnime} from "@/assets/anitop";

export default {
  name: "Recommendations",
  props: {
    animeName: String
  },
  setup(props) {
    const store = useStore();

    store.commit('setRecommendationLoading', true);

    if (!props.animeName) {
      getTopAnime().then((response) => {
        store.commit('setRecommendationLoading', false);
        store.commit("setRecommendations", response.map(v => ({...v, anime: v.title, animeLink: v.url, pictureImage: v.picture})));
      });
    } else {
      getAnimeRecommendationsByName(props.animeName).then((response) => {
        store.commit('setRecommendationLoading', false);
        store.commit("setRecommendations", response);
      })
    }
  },
}
</script>

<style scoped>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vignette {
  content: "";
  height: 25%;
  background: linear-gradient(to top, #181818, transparent);
}
.marquee {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.marquee-content {
  display: flex;
  animation: marquee linear infinite running;
}
.marquee-content:hover {
  animation-play-state: paused;
}
.marquee-tag {
  margin: 0 0.5em;
  padding: 0.5em;
  background: rgba(255,255,255,0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.marquee-tag:hover {
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}
@-moz-keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translate(-100%);
  }
}
@-webkit-keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translate(-100%);
  }
}
@-o-keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translate(-100%);
  }
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
