import api from '@/plugins/api'
import type { Resume, ResumesResponse, ResumeResponse, UpdateResumeDTO } from '@/types/resume'

class ResumeService {
  async getResumes(): Promise<Resume[]> {
    try {
      const response = await api.get<ResumesResponse>('resume/')
      return response.data.resumes
    } catch (error) {
      throw error
    }
  }

  async getResumeById(resumeId: string): Promise<Resume> {
    try {
      const response = await api.get<ResumeResponse>(`resume/${resumeId}/`)
      return response.data.resume
    } catch (error) {
      throw error
    }
  }

  async uploadResume(file: File): Promise<Resume> {
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const response = await api.post<ResumeResponse>('resume/', formData)
      return response.data.resume
    } catch (error) {
      throw error
    }
  }

  async updateResume(resumeId: string, data: UpdateResumeDTO): Promise<Resume> {
    try {
      const response = await api.patch<ResumeResponse>(`resume/${resumeId}/`, data)
      return response.data.resume
    } catch (error) {
      throw error
    }
  }

  async deleteResume(resumeId: string): Promise<Resume> {
    try {
      const response = await api.delete<ResumeResponse>(`resume/${resumeId}/`)
      return response.data.resume
    } catch (error) {
      throw error
    }
  }
}

export default new ResumeService()
