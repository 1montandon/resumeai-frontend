<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '@/components/HeaderComponent.vue'
import Button from '@/components/ButtonComponent.vue'
import { useResumeStore } from '@/stores/resume'
import { FileText, Trash2, ExternalLink } from 'lucide-vue-next'
import ResumeCardComponent from '@/components/ResumeCardComponent.vue'

const resumeStore = useResumeStore()
const fileInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  resumeStore.getResumes()
})

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    await resumeStore.createResume(file)
    target.value = ''
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this resume?')) {
    await resumeStore.deleteResume(id)
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <Header />

  <div class="min-h-svh bg-slate-50 px-10 md:px-20 py-12 flex flex-col gap-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-3xl text-slate-800">My Resumes</h1>
        <p class="text-slate-600">Manage your uploaded resumes and use them for analyses.</p>
      </div>

      <div>
        <input
          ref="fileInput"
          type="file"
          accept=".pdf"
          class="hidden"
          @change="handleFileUpload"
        />
        <Button type="primary" text="Upload Resume" :block="false" @click="triggerFileInput" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="resumeStore.isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="resumeStore.resumes.length === 0"
      class="flex flex-col items-center justify-center py-16 gap-4"
    >
      <FileText class="h-16 w-16 text-slate-300" />
      <h3 class="text-xl font-semibold text-slate-600">No resumes yet</h3>
      <p class="text-slate-500">Upload your first resume to get started with analyses.</p>
    </div>

    <!-- Resume Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ResumeCardComponent v-for="resume in resumeStore.resumes" :resume="resume">
      </ResumeCardComponent>
    </div>
  </div>
</template>
