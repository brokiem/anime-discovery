<template>
  <div class="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
    <img @click="redirect(anime.url)" title="Click to open MyAnimeList.net page" class="hover:cursor-pointer flex items-center justify-center w-auto mx-auto h-80 bg-gray-300 rounded-md dark:bg-grey" :src="anime.picture" alt="Anime cover">

    <div class="w-full">
      <span @click="copyToClipboard(`https://brokiem.is-a.dev/anime-discovery/?anime=${anime.title.replace(/\s+/g, '+')}`)" class="mr-3 font-bold text-lg text-gray-900 dark:text-white" data-tooltip="Click to copy the page URL">
        {{ anime.title }}
      </span>
      <span class="inline bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        {{ anime.type }}
      </span>
      <p class="mt-3 text-gray-900 dark:text-white" v-html="anime.synopsis"></p>
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
    <iframe class="w-full rounded-md aspect-video" loading="lazy" :src="anime.trailer.replace('&autoplay=1', '')" :title="anime.japaneseTitle" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  <div v-else>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="ml-1">Trailer not available</span>
  </div>

  <Toast class="fixed top-4 right-4" :class="showToast ? 'visible' : 'fade-out'"/>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import Character from "@/components/Character.vue";
import Toast from "@/components/Toast.vue";

export default {
  name: "Anime",
  components: {Toast, Character},
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
    }
  }
}
</script>

<style scoped>
.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.3;
}

.circle {
  stroke-width: 2.5;
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

.fade-out {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 250ms, opacity 250ms linear;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 100ms linear;
}
</style>