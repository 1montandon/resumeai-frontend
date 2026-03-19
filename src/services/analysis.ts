import api from '@/plugins/api'
import type { Analysis, AnalysesResponse, AnalysisResponse } from '@/types/analysis'

class AnalysisService {
  async getAnalyses(): Promise<Analysis[]> {
    try {
      const response = await api.get<AnalysesResponse>('analysis/')
      return response.data.analyses
    } catch (error) {
      throw error
    }
  }

  async createAnalysis(data: FormData): Promise<Analysis> {
    try {
      const response = await api.post<AnalysisResponse>('analysis/', data)
      return response.data.analysis
    } catch (error) {
      throw error
    }
  }

  async getAnalysisById(analysisId: string): Promise<Analysis> {
    try {
      const response = await api.get<AnalysisResponse>(`analysis/${analysisId}/`)
      return response.data.analysis
    } catch (error) {
      throw error
    }
  }
}

export default new AnalysisService()
