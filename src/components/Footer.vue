<template>
  <footer id="footer" :class="!$store.state.hasScrollbar ? 'fixed bottom-0 w-full' : ''" class="p-4 bg-gray-100 rounded-lg shadow flex items-center justify-center md:p-4 dark:bg-grey">
    <span class="mx-auto text-sm text-gray-500 text-center dark:text-gray-400">
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
      loading: computed(() => store.state.loading),
      setHasScrollbar: (hasScrollbar) => store.commit("setHasScrollbar", hasScrollbar)
    };
  },
  mounted() {
    this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));

    window.onresize = () => {
      this.setHasScrollbar(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight));
    };
  }
}
</script>

<style scoped>

</style>