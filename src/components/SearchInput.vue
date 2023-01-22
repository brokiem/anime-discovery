<template>
  <div class="flex flex-wrap mb-4 gap-x-2">
    <div>
      <a href="/anime-discovery/">
        <button type="button" class="outline-none ring-0 ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-md px-3 py-1.5 dark:bg-grey dark:text-white dark:border-gray-600 dark:hover:bg-[#282828] dark:hover:border-gray-600 dark:focus:ring-gray-700 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="sr-only">Home</span>
        </button>
      </a>
    </div>

    <div class="flex-1">
      <form @submit.prevent="search" class="flex items-center mr-5">
        <label for="searchInput" class="sr-only">Search</label>
        <div class="relative w-full">
          <input type="text" id="searchInput" class="outline-none ring-0 transition duration-200 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2 dark:bg-grey dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
        </div>
        <button type="submit" class="transition duration-200 p-2 px-5 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
    </div>
  </div>
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
      setAnime: (anime) => store.commit("setAnime", anime)
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

      getAnimeDetails(searchInput.value)
        .then((response) => {
          this.setLoading(false);
          this.setAnime(response);
        })
        .catch((error) => {
          this.setLoading(false)
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
