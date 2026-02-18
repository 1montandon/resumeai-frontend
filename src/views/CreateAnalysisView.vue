<script setup lang="ts">
import { reactive, ref } from 'vue'
import Button from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useAnalysisStore } from '@/stores/analysis'
import type { CreateAnalysis } from '@/types/analysis'
import { useRouter } from 'vue-router'
import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  console.log(files)
  if (files && files.length > 0) {
    analysisToCreate.resume = files[0]
  }
  // called when files are dropped on zone
}
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  // dataTypes: ['application/pdf', ],
  // control multi-file drop
  multiple: false,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})

const analysisToCreate: CreateAnalysis = reactive({
  resume: null,
  description: '',
})

const authStore = useAuthStore()
const analysisStore = useAnalysisStore()

const router = useRouter()
async function createAnalysis() {
  try {
    const response = await analysisStore.createAnalysis(analysisToCreate)
    alert('Analysis successful! Redirecting to home page...')
    router.push('/dashboard')
  } catch (err) {
    console.error('Erro ao criar análises:', err)
  }
}
</script>

<template>
  <div class="min-h-svh bg-slate-50 px-10 md:px-20 py-12 flex flex-col gap-10">
    <!-- Title -->
    <div class="text-center flex flex-col gap-2">
      <h1 class="font-bold text-3xl text-slate-800">Upload your resume</h1>
      <p class="text-slate-600 max-w-xl mx-auto">
        Upload your resume and paste the job description to analyze how well they match. Supported
        formats: PDF, DOC, DOCX.
      </p>
    </div>

    <!-- Resume Upload -->
    <div class="flex flex-col gap-3">
      <div
        v-if="analysisToCreate.resume == null"
        ref="dropZoneRef"
        class="w-full h-56 rounded-xl border-2 border-dashed border-slate-200 bg-white/90 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition"
      >
        <h2 class="text-lg font-semibold text-slate-700">Drag & drop your resume here</h2>

        <p class="text-sm text-slate-500">or click to select a file</p>

        <input
          type="file"
          class="text-sm text-slate-600 mt-2"
          @change="
            (e) => {
              if (e.target.files && e.target.files.length > 0)
                analysisToCreate.resume = e.target.files[0]
            }
          "
        />
      </div>

      <!-- Uploaded state -->
      <div
        v-else
        class="w-full h-56 rounded-xl border border-slate-200 bg-blue-50 flex flex-col items-center justify-center gap-2"
      >
        <h2 class="text-lg font-semibold text-blue-700">Resume uploaded successfully</h2>

        <button
          class="text-sm text-blue-600 hover:text-blue-500 transition"
          @click="analysisToCreate.resume = null"
        >
          Upload a different file
        </button>
      </div>
    </div>

    <!-- Job Description -->
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-semibold text-slate-800">Job description</h2>

      <div class="rounded-xl border border-slate-200 bg-white/90 p-4">
        <textarea
          v-model="analysisToCreate.description"
          placeholder="Paste the job description here..."
          class="w-full min-h-50 resize-none bg-transparent outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      <p class="text-sm text-slate-500">
        The more detailed the description, the more accurate the analysis.
      </p>
    </div>

    <!-- Action -->
    <div class="flex justify-center pt-4">
      <Button type="primary" text="Analyze resume" :block="false" @click="createAnalysis" />
    </div>
  </div>
</template>
