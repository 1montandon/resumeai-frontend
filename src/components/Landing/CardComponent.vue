<template>
  <div
    class="rounded-xl border border-slate-200 bg-white/90 flex flex-col gap-3 text-left hover:border-slate-300 p-5 transition-all"
  >
    <div class="bg-black h-50 rounded-xl">
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
