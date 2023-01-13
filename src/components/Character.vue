<template>
  <div class="flex items-center bg-gray-100 border border-black/10 rounded-md shadow-sm flex-row dark:border-gray-300/20 dark:bg-grey">
    <img class="object-cover h-[62px] w-12 rounded-l-md" :src="character.picture.replace('https://cdn.myanimelist.net/images/questionmark_23.jpg', 'https://cdn.myanimelist.net/r/42x62/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c')" alt="">
    <div class="flex-1 flex-col justify-between pl-2 pr-2">
      <a :href="character.link" target="_blank" class="font-normal leading-none text-[0.95rem] hover:underline text-gray-700 dark:text-gray-400">
        {{ character.name }}
      </a>
      <p class="font-normal text-xs mt-1 text-gray-700 dark:text-gray-400">{{ character.role }}</p>
    </div>

    <div v-if="!isStaff && character.seiyuu.name.length > 0" class="flex-1 flex-col justify-between pl-6 pr-2">
      <p @click="redirect(character.seiyuu.link)" class="font-normal leading-none hover:cursor-pointer text-[0.95rem] hover:underline text-gray-700 dark:text-gray-400 text-end">
        {{ character.seiyuu.name }}
      </p>
      <p class="font-normal text-xs mt-2 text-gray-700 dark:text-gray-400 text-end">Japanese</p>
    </div>
    <img v-if="!isStaff && character.seiyuu.name.length > 0" class="object-cover h-[62px] w-12 rounded-r-md" :src="character.seiyuu.picture" alt="">
  </div>
</template>

<script>
export default {
  name: "Character",
  props: {
    character: {
      type: Object,
      required: true
    },
    isStaff: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    redirect(link) {
      window.open(link, "_blank");
    }
  }
}
</script>