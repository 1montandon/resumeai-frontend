// ==================== Entities ====================

export interface Resume {
  id: string
  resumeUrl: string
  resumeTitle: string
  resumeText: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

// ==================== API Responses ====================

export interface ResumesResponse {
  resumes: Resume[]
}

export interface ResumeResponse {
  resume: Resume
}

// ==================== DTOs ====================

export interface UpdateResumeDTO {
  title?: string
}
