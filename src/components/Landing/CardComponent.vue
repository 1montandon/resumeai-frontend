<template>
  <div
    class="flex flex-col gap-3 text-left border border-slate-50 hover:border-slate-300 p-5 rounded-lg transition-all"
  >
    <div class="bg-black h-50 rounded-lg">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>
    <h3 class="md:text-xl font-bold text-slate-800">{{ title }}</h3>
    <p class="text-base text-slate-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
})
</script>
