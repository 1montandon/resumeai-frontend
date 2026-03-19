import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import AnalysisService from '@/services/analysis'
import type { Analysis, CreateAnalysisDTO } from '@/types/analysis'

const analysisService = AnalysisService

export const useAnalysisStore = defineStore('analysis', () => {
  const state = reactive({
    analyses: [] as Analysis[],
    isLoading: false,
    analysis: null as Analysis | null,
  })

  const analyses = computed(() => state.analyses)
  const isLoading = computed(() => state.isLoading)
  const analysis = computed(() => state.analysis)

  const clearAnalyses = () => {
    state.analyses = []
  }

  const getAnalyses = async () => {
    state.isLoading = true
    try {
      const response = await analysisService.getAnalyses()
      state.analyses = response
      return response
    } catch (error) {
      console.log(error)
      clearAnalyses()
    } finally {
      state.isLoading = false
    }
  }

  const createAnalysis = async (data: CreateAnalysisDTO) => {
    state.isLoading = true
    try {
      const formData = new FormData()
      if (data.resume) {
        formData.append('resume', data.resume)
      }
      if (data.resumeId) {
        formData.append('resumeId', data.resumeId)
      }
      formData.append('description', data.description)

      const response = await analysisService.createAnalysis(formData)
      await getAnalyses()
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  const getAnalysisById = async (id: string) => {
    state.isLoading = true
    try {
      const response = await analysisService.getAnalysisById(id)
      state.analysis = response
      return response
    } catch (error) {
      console.log(error)
      state.analysis = null
    } finally {
      state.isLoading = false
    }
  }

  return {
    analyses,
    isLoading,
    analysis,
    state,
    getAnalyses,
    createAnalysis,
    getAnalysisById,
    clearAnalyses,
  }
})
