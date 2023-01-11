<template>
  <div class="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
    <img class="flex items-center justify-center w-auto mx-auto h-80 bg-gray-300 rounded-md dark:bg-grey" :src="anime.picture" alt="Anime cover">

    <div class="w-full">
      <span class="font-bold text-lg text-gray-900 dark:text-white">
        {{ anime.title }}
      </span>
      <p class="mt-5 text-gray-900 dark:text-white" v-html="anime.synopsis.replaceAll('\n', '<br>').replaceAll('[Written by MAL Rewrite]', '')"></p>
    </div>
    <span class="sr-only">Loading...</span>
  </div>

  <hr class="rounded my-5">

  <div class="block p-6 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-grey dark:border-white/10">
    <div class="flex space-x-6 items-center content-center">
      <div>
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
        <div class="pt-3"></div>
        <p class="text-center text-gray-900 dark:text-white">Score</p>
      </div>

      <div class="vertical-line h-32"></div>

      <div class="w-full">
        <span class="text-gray-900 dark:text-white">Ranked <span class="font-bold">{{$store.state.anime.ranked}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Popularity <span class="font-bold">{{$store.state.anime.popularity}}</span></span><br>
        <hr class="rounded h-3 mt-1">
        <span class="text-gray-900 dark:text-white">Members <span class="font-bold">{{$store.state.anime.members}}</span></span><br>
        <hr class="rounded h-3 mt-1">
      </div>
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
  animation: progress 1s ease-in-out forwards;
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