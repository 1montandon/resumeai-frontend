<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useAnalysisStore } from '@/stores/analysis'

const authStore = useAuthStore()
const analysisStore = useAnalysisStore()
onMounted(() => {
  analysisStore.getAnalyses()
})

import { computed } from 'vue'

const compatibilityScore = computed(() =>
  analysisStore.analyses.reduce((sum, analysis) => sum + analysis.score * 100, 0),
)
function progressBarColor(score: number) {
  if (score <= 50) return '#FF4D4F' // red
  if (score <= 70) return '#FAAD14' // yellow
  if (score <= 85) return '#52C41A' // green
  return '#0D80F2' // blue
}
</script>

<template>
  <div class="bg-slate-50 px-20 py-12 flex flex-col gap-10">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="font-bold text-3xl text-slate-800">Dashboard</h1>
      <p class="text-slate-600">
        Welcome back {{ authStore.user.username }}, here's a summary of your activity.
      </p>
    </div>

    <!-- Stats -->
    <div class="flex flex-row justify-between gap-6">
      <div class="w-80 rounded-xl border border-slate-200 bg-white/90 p-6">
        <p class="text-sm font-medium text-slate-500">Total Analyses</p>
        <h3 class="mt-1 text-2xl font-bold text-slate-800">
          {{ analysisStore.analyses.length }}
        </h3>
      </div>

      <div class="w-80 rounded-xl border border-slate-200 bg-white/90 p-6">
        <p class="text-sm font-medium text-slate-500">Average Compatibility</p>
        <h3 class="mt-1 text-2xl font-bold text-slate-800">
          {{ (compatibilityScore / analysisStore.analyses.length).toFixed(2) }}%
        </h3>
      </div>

      <div class="w-80 rounded-xl border border-slate-200 bg-white/90 p-6">
        <p class="text-sm font-medium text-slate-500">Analyses Generated</p>
        <h3 class="mt-1 text-2xl font-bold text-slate-800">
          {{ analysisStore.analyses.length }}
        </h3>
      </div>
    </div>

    <!-- Table -->
    <div class="flex flex-col gap-4">
      <h2 class="font-bold text-2xl text-slate-800">Recent Analyses</h2>

      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white/90">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-100 text-slate-700 text-xs">
            <tr>
              <th class="px-6 py-4 text-center justify-center hidden md:flex">ID</th>
              <th class="px-6 py-4 text-center">Job Description</th>
              <th class="px-6 py-4 text-center justify-center hidden md:flex">Overview</th>
              <th class="px-6 py-4 text-center">Compatibility</th>
              <th class="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="analysis in analysisStore.analyses"
              :key="analysis.id"
              class="border-t border-slate-200 odd:bg-white even:bg-slate-50 text-center"
            >
              <td class="px-6 py-6 font-medium text-slate-700 justify-center hidden md:flex">
                {{ analysis.id }}
              </td>

              <td class="px-6 py-6 text-slate-600 ">
                {{ analysis.jobDescription.slice(0, 20) }}...
              </td>

              <td class="px-6 py-6 text-slate-600 justify-center hidden md:flex">
                {{ analysis.overview.slice(0, 45) }}...
              </td>

              <td class="px-6 py-6">
                <div class="flex items-center justify-center gap-3">
                  <div class="h-2.5 w-24 rounded-full bg-slate-200">
                    <div
                      class="h-2.5 rounded-full bg-blue-600 transition-all"
                      :style="{ width: analysis.score * 100 + '%' }"
                    />
                  </div>
                  <span class="text-sm text-slate-600"> {{ analysis.score * 100 }}% </span>
                </div>
              </td>

              <td class="px-6 py-6">
                <router-link
                  :to="`/analysis/${analysis.id}`"
                  class="text-blue-600 font-medium hover:text-blue-500 transition"
                >
                  View analysis →
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CTA -->
    <div class="flex justify-end">
      <Button type="primary" to="/analysis" text="Start new analysis" :block="false" />
    </div>
  </div>
</template>
