<script setup lang="ts">
import { onMounted, computed } from 'vue'
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
import { useAnalysisStore } from '@/stores/analysis'
import analysis from '@/services/analysis'

const props = defineProps<{ id: string | number }>()
const analysisStore = useAnalysisStore()

const compatibilityScore = computed(() =>
  analysisStore.analysis ? analysisStore.analysis.score * 100 : 0,
)

const progressBarColor = computed(() => {
  const score = compatibilityScore.value
  if (score <= 50) return '#FF4D4F' // red
  if (score <= 70) return '#FAAD14' // yellow
  if (score <= 85) return '#52C41A' // green
  return '#0D80F2' // blue
})

onMounted(() => {
  analysisStore.getAnalysisById(props.id)
})
</script>

<template>
  <Header />

  <div class="min-h-svh bg-slate-50 px-60 py-12 flex flex-col gap-12">
    <!-- Title -->
    <div class="flex flex-col gap-2">
      <h1 class="font-bold text-3xl text-slate-800">Resume Analysis</h1>
      <p class="text-slate-600">
        Review the compatibility between your resume and the job description.
      </p>
    </div>

    <!-- Score Card -->
    <div class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h3 class="font-semibold text-slate-700">Compatibility Score</h3>
        <span class="font-bold text-slate-800"> {{ compatibilityScore }}% </span>
      </div>

      <div class="h-2.5 w-full rounded-full bg-slate-200">
        <div
          class="h-2.5 rounded-full bg-blue-600 transition-all"
          :style="{ width: compatibilityScore + '%' }"
        />
      </div>

      <p class="text-sm text-slate-500">
        This score reflects how closely your resume matches the job requirements.
      </p>
    </div>

    <!-- Strengths & Weaknesses -->
    <div v-if="analysisStore.analysis" class="grid grid-cols-2 gap-8">
      <!-- Strengths -->
      <div class="rounded-xl border border-slate-200 bg-white/90 p-8">
        <h2 class="font-bold text-xl text-slate-800 mb-4">Strengths</h2>
        <ul class="space-y-3">
          <li
            v-for="strength in JSON.parse(analysisStore.analysis.strengths)"
            :key="strength"
            class="flex items-start gap-3"
          >
            <span class="mt-1 h-2 w-2 rounded-full bg-blue-600" />
            <p class="text-slate-600">
              {{ strength }}
            </p>
          </li>
        </ul>
      </div>

      <!-- Weaknesses -->
      <div class="rounded-xl border border-slate-200 bg-white/90 p-8">
        <h2 class="font-bold text-xl text-slate-800 mb-4">Weaknesses</h2>
        <ul class="space-y-3">
          <li
            v-for="weak in JSON.parse(analysisStore.analysis.weaknesses)"
            :key="weak"
            class="flex items-start gap-3"
          >
            <span class="mt-1 h-2 w-2 rounded-full bg-slate-400" />
            <p class="text-slate-600">
              {{ weak }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Overview -->
    <div
      v-if="analysisStore.analysis"
      class="rounded-xl border border-slate-200 bg-white/90 p-8 flex flex-col gap-3"
    >
      <h2 class="font-bold text-xl text-slate-800">Overview</h2>
      <p class="text-slate-600 leading-relaxed">
        {{ analysisStore.analysis.overview }}
      </p>
    </div>

    <!-- Job Description -->
    <div
      v-if="analysisStore.analysis"
      class="rounded-xl border border-slate-200 bg-slate-50 p-8 flex flex-col gap-3"
    >
      <h2 class="font-bold text-xl text-slate-800">Job Description</h2>
      <p class="text-slate-600 whitespace-pre-line">
        {{ analysisStore.analysis.jobDescription }}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex justify-end">
      <Button type="primary" to="/dashboard" text="Back to dashboard" :block="false" />
    </div>
  </div>
</template>
