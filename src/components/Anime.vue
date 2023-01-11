<template>
  <div class="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
    <img @click="redirect(anime.url)" class="hover:cursor-pointer flex items-center justify-center w-auto mx-auto h-80 bg-gray-300 rounded-md dark:bg-grey" :src="anime.picture" alt="Anime cover">

    <div class="w-full">
      <span class="font-bold text-lg text-gray-900 dark:text-white">
        {{ anime.title }}
        <span class="ml-1 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {{ anime.type }}
        </span>
      </span>
      <p class="mt-3 text-gray-900 dark:text-white" v-html="anime.synopsis.replaceAll('\n', '<br>').replaceAll('[Written by MAL Rewrite]', '')"></p>
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
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Anime",
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
  methods: {
    redirect(url) {
      window.open(url, "_blank");
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
</style>