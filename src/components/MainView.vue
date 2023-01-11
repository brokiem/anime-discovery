<template>
  <div class="flex content-center justify-center">
    <div class="mt-10 w-full max-w-4xl mx-5 text-white">
      <SearchInput/>

      <div class="mt-8">
        <Skeleton v-if="($store.state.loading !== null && $store.state.loading)"/>
        <Anime v-if="($store.state.loading !== null && !$store.state.loading)"/>

        <h1 v-if="$store.state.loading === null" class="text-center">
          Welcome to brokiem's Anime discovery!<br>
          Start searching for anime with the search button above.
        </h1>
      </div>
    </div>
  </div>

  <div class="pb-20"></div>
</template>

<script>
import Skeleton from "@/components/Skeleton.vue";
import Anime from "@/components/Anime.vue";
import SearchInput from "@/components/SearchInput.vue";
import {getAnimeDetails} from "@/assets/mal";
import {useStore} from "vuex";

export default {
  name: "MainView",
  components: {SearchInput, Anime, Skeleton},
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

    return {animeTitle}
  }
}
</script>

<style scoped>

</style>