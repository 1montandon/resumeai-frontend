<script setup lang="ts">
import type { Resume } from '@/types/resume'
import { useResumeStore } from '@/stores/resume'
import { FileText, Trash2, ExternalLink } from 'lucide-vue-next'

const resumeStore = useResumeStore()
defineProps<{
  resume: Resume
}>()

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
  <div
    :key="resume.id"
    class="rounded-xl border border-slate-200 bg-white/90 flex flex-col gap-3 text-left hover:border-slate-300 p-5 transition-all"
  >
    <!-- Icon and Title -->
    <div class="flex items-start gap-4">
      <div class="p-3 rounded-lg bg-blue-50">
        <FileText class="h-6 w-6 text-blue-600" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-slate-800 truncate" :title="resume.resumeTitle">
          {{ resume.resumeTitle }}
        </h3>
        <p class="text-sm text-slate-500">Uploaded {{ formatDate(resume.createdAt) }}</p>
      </div>
    </div>

    <!-- Preview Text -->
    <p class="text-sm text-slate-600 line-clamp-3">{{ resume.resumeText.slice(0, 150) }}...</p>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-2 border-t border-slate-100">
      <a
        :href="resume.resumeUrl"
        target="_blank"
        class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition"
      >
        <ExternalLink class="h-4 w-4" />
        View PDF
      </a>

      <button
        class="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition cursor-pointer"
        @click="handleDelete(resume.id)"
      >
        <Trash2 class="h-4 w-4" />
        Delete
      </button>
    </div>
  </div>
</template>
