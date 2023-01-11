<template>
  <footer id="footer" :class="loading === null ? 'fixed bottom-0 w-full' : ''" class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-grey">
    <span class="mx-auto text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © {{new Date().getFullYear()}} <a href="https://brokiem.is-a.dev/" class="hover:underline">brokiem</a> | Data from <a href="https://myanimelist.net" class="hover:underline">MyAnimeList.net</a>
    </span>
  </footer>

</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Footer",
  setup() {
    const store = useStore();

    return {
      loading: computed(() => store.state.loading)
    };
  },
}
</script>

<style scoped>

</style>