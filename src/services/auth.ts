import api from '@/plugins/api'
import type {
  LoginResponse,
  LoginDTO,
  RegisterDTO,
  RegisterResponse,
  User,
} from '@/types/auth'

class AuthService {
  async login(data: LoginDTO): Promise<string> {
    try {
      const response = await api.post<LoginResponse>('login/', data)
      return response.data.accessToken
    } catch (error) {
      throw error
    }
  }

  async register(data: RegisterDTO): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>('register/', data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await api.get<User>('user/')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
