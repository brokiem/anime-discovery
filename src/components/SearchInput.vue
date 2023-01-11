<template>
  <form @submit.prevent="search" class="flex items-center mb-4">
    <label for="searchInput" class="sr-only">Search</label>
    <div class="relative w-full">
      <input type="text" id="searchInput" class="outline-none ring-0 transition duration-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2 dark:bg-grey dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
    </div>
    <button type="submit" class="transition duration-200 p-2 px-5 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <span class="sr-only">Search</span>
    </button>
  </form>
</template>

<script>
import {getAnimeDetails} from "@/assets/mal";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "SearchInput",
  setup() {
    const store = useStore();

    return {
      isLoading: computed(() => store.state.loading),
      setLoading: (loading) => store.commit("setLoading", loading),
      setAnime: (anime) => store.commit("setAnime", anime),
      setHasScrollbar: (hasScrollbar) => store.commit("setHasScrollbar", hasScrollbar)
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeTitle = urlParams.get("anime");

    if (animeTitle !== null) {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = animeTitle;
    }
  },
  methods: {
    search() {
      if (this.isLoading) return;

      const searchInput = document.getElementById("searchInput");
      window.history.pushState(
          {'anime': searchInput.value},
          'Anime',
          `${import.meta.env.BASE_URL}?anime=${searchInput.value.replace(/\s+/g, "+")}`
      );

      this.setLoading(true);
      this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));

      getAnimeDetails(searchInput.value)
        .then((response) => {
          this.setLoading(false);
          this.setAnime(response);
          this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));
        })
        .catch((error) => {
          this.setLoading(false)
          this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>