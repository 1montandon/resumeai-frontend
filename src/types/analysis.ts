import type { Resume } from './resume'

// ==================== Entities ====================

export interface Analysis {
  id: string
  jobDescription: string
  score: number
  strengths: string // JSON string
  weaknesses: string // JSON string
  overview: string
  aiUsed: string
  resumeId: string
  resume: Pick<Resume, 'id' | 'resumeTitle'>
  userId: string
  createdAt: Date
  updatedAt: Date
}

// ==================== API Responses ====================

export interface AnalysesResponse {
  analyses: Analysis[]
}

export interface AnalysisResponse {
  analysis: Analysis
}

// ==================== DTOs ====================

export interface CreateAnalysisDTO {
  description: string
  resume?: File
  resumeId?: string
}
