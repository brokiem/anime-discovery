<template>
  <div class="marquee rounded-md mx-5">
    <div class="marquee-content" :style="{'animation-duration': $store.state.recommendations.length * 1500 + 'ms'}">
      <div v-for="anime in $store.state.recommendations" class="marquee-tag mt-10 w-[225px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10">
        <a :href="'?anime=' + anime.animeLink.split('/')[anime.animeLink.split('/').length - 1].replaceAll('_', '+')">
          <img class="rounded-md h-[332px]" :title="anime.anime" :src="anime.pictureImage.replace('r/50x70/', '').split('?')[0].split('#')[0]" alt="" />
        </a>
      </div>

      <div v-if="$store.state.recommendations.length <= 0" class="marquee-tag mt-10 w-[225px] h-[350px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10"></div>
      <div v-if="$store.state.recommendations.length <= 0" class="marquee-tag mt-10 w-[225px] h-[350px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10"></div>
      <div v-if="$store.state.recommendations.length <= 0" class="marquee-tag mt-10 w-[225px] h-[350px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10"></div>
      <div v-if="$store.state.recommendations.length <= 0" class="marquee-tag mt-10 w-[225px] h-[350px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10"></div>
      <div v-if="$store.state.recommendations.length <= 0" class="marquee-tag mt-10 w-[225px] h-[350px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10"></div>
    </div>
  </div>
</template>

<script>
import {getAnimeRecommendationsByName} from "@/assets/mal";
import {useStore} from "vuex";

export default {
  name: "Recommendations",
  props: {
    animeName: String
  },
  setup(props) {
    const store = useStore();

    getAnimeRecommendationsByName(props.animeName)
        .then((response) => {
          store.commit("setRecommendations", response);
        })
  },
}
</script>

<style scoped>

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