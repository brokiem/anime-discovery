<template>
  <div class="mx-5">
    <div class="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
      <img id="anime-cover-image" @click="redirect(anime.url)" title="Click to open MyAnimeList.net page" class="hover:cursor-pointer flex items-center justify-center w-auto min-w-[225px] mx-auto h-80 bg-gray-300 rounded-md dark:bg-grey" :src="anime.picture" alt="Anime cover">

      <div class="w-full">
        <span @click="copyToClipboard(`https://brokiem.is-a.dev/anime-discovery/?anime=${anime.title.replace(/\s+/g, '+')}`)" class="mr-3 font-bold text-lg text-gray-900 dark:text-white" data-tooltip="Click to copy the page URL">
          {{ anime.title }}
          <span class="bg-blue-100 text-blue-800 text-sm font-medium ml-1 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {{ anime.type }}
          </span>
        </span>

        <div class="mt-1">
          <div class="flex flex-row flex-wrap gap-y-2">
            <div v-for="genre in anime.genres.filter(e => e !== 'Award Winning')" class="font-light w-fit border border-gray-400 rounded-md text-gray-900 text-xs mr-2 px-2 py-0.5 rounded dark:text-gray-200">
              {{ genre }}
            </div>
          </div>
        </div>

<!--        <div v-for="genre in anime.genres.filter(e => e !== 'Award Winning')" class="hidden md:block md:float-right md:inline w-fit border border-gray-400 rounded-full text-gray-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-white">-->
<!--          {{ genre }}-->
<!--        </div>-->

        <p class="mt-2 text-gray-900 dark:text-white md:max-h-[17.125rem] md:pr-2 overflow-x-hidden" v-html="anime.synopsis"></p>
      </div>
      <span class="sr-only">Loading...</span>
    </div>

    <hr class="rounded my-5">

    <div class="md:flex md:space-x-5 md:items-center md:content-center">
      <div class="grid place-items-center mb-7 md:mb-0">
        <svg viewBox="0 0 36 36" class="h-20 w-20">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                :fill="ratingColor.fill"
          />
          <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                :fill="ratingColor.fill"
                :stroke="ratingColor.stroke"
                stroke-width="2"
                :stroke-dasharray="($store.state.anime.score * 10) + ', 100'"
          />
          <text x="18" y="22.5" :fill="ratingColor.text" class="percentage">{{$store.state.anime.score}}</text>
        </svg>
        <div class="pt-2"></div>
        <p class="text-center text-gray-900 dark:text-white">Score</p>
      </div>

      <div class="vertical-line h-20 hidden md:block"></div>

      <div class="w-full md:w-[50%]">
        <span class="text-gray-900 dark:text-white">Ranked <span class="float-right">{{$store.state.anime.ranked}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Popularity <span class="float-right">{{$store.state.anime.popularity}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Members <span class="float-right">{{$store.state.anime.members}}</span></span><br>
        <hr class="rounded h-3 mt-1">
      </div>

      <div class="vertical-line h-20 hidden md:block"></div>

      <div class="w-full md:w-[50%]">
        <span class="text-gray-900 dark:text-white">Status <span class="float-right">{{$store.state.anime.status}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Aired <span class="float-right">{{$store.state.anime.aired}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Rating <span class="float-right">{{$store.state.anime.rating}}</span></span><br>
        <hr class="rounded h-3 mt-1">
      </div>
    </div>

    <hr class="rounded my-5">

    <p class="mb-1 text-gray-900 dark:text-white">Characters & Voice Actors</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
      <Character v-for="character in anime.characters" :character="character" />
    </div>

    <p class="mt-8 mb-1 text-gray-900 dark:text-white">Staff</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
      <Character v-for="staff in anime.staff" :character="staff" :is-staff="true" />
    </div>

    <p class="mt-8 mb-1 text-gray-900 dark:text-white">Trailer</p>
    <div v-if="anime.trailer !== undefined">
      <LiteYouTubeEmbed class="w-full rounded-md aspect-video" :cookie="true" :title="anime.title + ' Trailer'" :id="getVideoId(anime.trailer)"/>
    </div>
    <div v-else>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="ml-1">Trailer not available</span>
    </div>

    <p class="mt-8 mb-1 text-gray-900 dark:text-white">Recommendations</p>
  </div>
  <Recommendations :anime-name="anime.title"/>

  <Toast class="fixed top-4 right-4" :class="showToast ? 'visible' : 'fade-out'"/>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import Character from "@/components/Character.vue";
import Toast from "@/components/Toast.vue";
import Recommendations from "@/components/Recommendations.vue";
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

export default {
  name: "Anime",
  components: {LiteYouTubeEmbed, Recommendations, Toast, Character},
  setup() {
    const store = useStore();

    const ratingColor = computed(() => {
      if (store.state.anime.score >= 7) {
        return {stroke: "#00CC66", fill: "#E4F9EE", text: "#008800"};
      } else if (store.state.anime.score >= 5) {
        return {stroke: "#FFAA33", fill: "#FFF6E9", text: "#C33300"};
      } else if (store.state.anime.score >= 1) {
        return {stroke: "#FF3333", fill: "#FFE9E9", text: "#D63131"};
      } else {
        return {stroke: "#999999", fill: "#FFFFFF", text: "#999999"};
      }
    });

    return {
      anime: computed(() => store.state.anime),
      ratingColor
    };
  },
  data() {
    return {
      showToast: false
    };
  },
  methods: {
    redirect(url) {
      window.open(url, "_blank");
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);

      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    getVideoId(url){
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : false;
    }
  }
}
</script>

<style scoped>
.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 2;
}

.circle {
  stroke-width: 2.6;
  stroke-linecap: round;
  animation: progress 1.5s ease-in-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.percentage {
  font-size: 0.7em;
  text-anchor: middle;
}
</style>
