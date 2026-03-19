import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import ResumeService from '@/services/resume'
import type { Resume, UpdateResumeDTO } from '@/types/resume'

const resumeService = ResumeService

export const useResumeStore = defineStore('resume', () => {
  const state = reactive({
    resumes: [] as Resume[],
    isLoading: false,
    resume: null as Resume | null,
  })

  const resumes = computed(() => state.resumes)
  const isLoading = computed(() => state.isLoading)
  const resume = computed(() => state.resume)

  const clearResumes = () => {
    state.resumes = []
  }

  const getResumes = async () => {
    state.isLoading = true
    try {
      const response = await resumeService.getResumes()
      state.resumes = response
      return response
    } catch (error) {
      console.log(error)
      clearResumes()
    } finally {
      state.isLoading = false
    }
  }

  const getResumeById = async (id: string) => {
    state.isLoading = true
    try {
      const response = await resumeService.getResumeById(id)
      state.resume = response
      return response
    } catch (error) {
      console.log(error)
      state.resume = null
    } finally {
      state.isLoading = false
    }
  }

  const createResume = async (file: File) => {
    state.isLoading = true
    try {
      const response = await resumeService.uploadResume(file)
      await getResumes()
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  const updateResume = async (id: string, data: UpdateResumeDTO) => {
    state.isLoading = true
    try {
      const response = await resumeService.updateResume(id, data)
      await getResumes()
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  const deleteResume = async (id: string) => {
    state.isLoading = true
    try {
      const response = await resumeService.deleteResume(id)
      await getResumes()
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  return {
    resumes,
    isLoading,
    resume,
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
    clearResumes,
  }
})
