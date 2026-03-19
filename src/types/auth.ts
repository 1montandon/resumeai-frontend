// ==================== Entities ====================

export interface User {
  id: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

// ==================== API Responses ====================

export interface LoginResponse {
  accessToken: string
}

export interface RegisterResponse {
  id: string
  email: string
  username: string
}

export interface UserResponse {
  user: User
}

// ==================== DTOs ====================

export interface LoginDTO {
  username: string
  password: string
}

export interface RegisterDTO {
  email: string
  username: string
  password: string
}
