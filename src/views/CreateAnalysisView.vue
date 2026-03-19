<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import Button from '@/components/ButtonComponent.vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useResumeStore } from '@/stores/resume'
import type { CreateAnalysisDTO } from '@/types/analysis'
import { useRouter } from 'vue-router'
import { useDropZone } from '@vueuse/core'
import type { Resume } from '@/types/resume'
import ResumeCardComponent from '@/components/ResumeCardComponent.vue'

const dropZoneRef = ref<HTMLDivElement>()
const resumeStore = useResumeStore()
const analysisStore = useAnalysisStore()
const router = useRouter()
const resumes = ref<Resume[]>([])
const selectedResumeId = ref<string | null>(null)

function onDrop(files: File[] | null) {
  if (files && files.length > 0) {
    analysisToCreate.resume = files[0]
    selectedResumeId.value = null
  }
}

const { isOverDropZone: _ } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: false,
  preventDefaultForUnhandled: false,
})

const analysisToCreate: CreateAnalysisDTO = reactive({
  resume: undefined,
  description: '',
})

onMounted(async () => {
  try {
    // Fetch existing resumes from API
    resumes.value = await resumeStore.getResumes()
  } catch (err) {
    console.error('Error fetching resumes:', err)
  }
})

async function createAnalysis() {
  try {
    await analysisStore.createAnalysis(analysisToCreate)
    alert('Analysis successful! Redirecting to dashboard...')
    router.push('/dashboard')
  } catch (err) {
    console.error('Error creating analysis:', err)
  }
}

function selectResume(resumeId: string) {
  selectedResumeId.value = resumeId
  analysisToCreate.resume = undefined
}
</script>

<template>
  <div class="min-h-svh bg-slate-50 px-10 md:px-20 py-12 flex flex-col gap-10">
    <!-- Title -->
    <div class="text-center flex flex-col gap-2">
      <h1 class="font-bold text-3xl text-slate-800">Upload your resume</h1>
      <p class="text-slate-600 max-w-xl mx-auto">
        Upload your resume and paste the job description to analyze how well they match. Supported
        formats: PDF
      </p>
    </div>

    <!-- Resume Selection: Existing or New Upload -->
    <div class="flex flex-col gap-6">
      <!-- Existing Resumes -->
      <div v-if="resumes.length > 0" class="flex flex-col gap-3">
        <h2 class="text-xl font-semibold text-slate-800">Your resumes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ResumeCardComponent
            v-for="resume in resumes"
            :resume="resume"
            @click="selectResume(resume.id)"
          >
          </ResumeCardComponent>
        </div>
      </div>

      <!-- New Upload -->
      <div class="flex flex-col gap-3">
        <h2 class="text-xl font-semibold text-slate-800">Or upload a new resume</h2>
        <div
          v-if="analysisToCreate.resume == null && !selectedResumeId"
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
                const target = e.target as HTMLInputElement
                if (target.files && target.files.length > 0) {
                  analysisToCreate.resume = target.files[0]
                  selectedResumeId = null
                }
              }
            "
          />
        </div>

        <!-- Uploaded state -->
        <div
          v-else-if="analysisToCreate.resume"
          class="w-full h-56 rounded-xl border border-slate-200 bg-blue-50 flex flex-col items-center justify-center gap-2"
        >
          <h2 class="text-lg font-semibold text-blue-700">Resume uploaded successfully</h2>
          <p class="text-sm text-blue-600">{{ analysisToCreate.resume.name }}</p>
          <button
            class="text-sm text-blue-600 hover:text-blue-500 transition"
            @click="analysisToCreate.resume = null"
          >
            Upload a different file
          </button>
        </div>

        <!-- Selected existing resume state -->
        <div
          v-else-if="selectedResumeId"
          class="w-full h-56 rounded-xl border border-slate-200 bg-blue-50 flex flex-col items-center justify-center gap-2"
        >
          <h2 class="text-lg font-semibold text-blue-700">Resume selected</h2>
          <button
            class="text-sm text-blue-600 hover:text-blue-500 transition"
            @click="selectedResumeId = null"
          >
            Choose a different resume
          </button>
        </div>
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
      <Button
        type="primary"
        text="Analyze resume"
        :block="false"
        @click="createAnalysis"
        :disabled="!analysisToCreate.resume && !selectedResumeId"
      />
    </div>
  </div>
</template>
