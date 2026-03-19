import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import AuthService from '@/services/auth'
import type { LoginDTO, RegisterDTO, User } from '@/types/auth'
import { useAnalysisStore } from './analysis'

const authService = AuthService

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    user: useStorage('user', {} as User),
    access: useStorage('access', ''),
    isLoading: false,
    isLogged: useStorage('isLogged', false),
  })

  const user = computed(() => state.user)
  const token = computed(() => state.access)
  const isLoading = computed(() => state.isLoading)
  const isLogged = computed(() => state.isLogged)

  const clearToken = () => {
    state.access = ''
    state.isLogged = false
  }

  const setToken = (token: string) => {
    state.access = token
    state.isLogged = true
  }

  const login = async (data: LoginDTO) => {
    clearToken()
    state.isLoading = true
    try {
      const response = await authService.login(data)
      setToken(response)
      return response
    } catch (error) {
      console.log(error)
      clearToken()
    } finally {
      state.user = await authService.getMe()
      state.isLogged = true
      state.isLoading = false
    }
  }

  const register = async (data: RegisterDTO) => {
    clearToken()
    state.isLoading = true
    try {
      const response = await authService.register(data)
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  const getMe = async () => {
    state.isLoading = true
    try {
      const response = await authService.getMe()
      state.user = response
      return response
    } catch (error) {
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }

  const logout = () => {
    const analysisStore = useAnalysisStore()
    analysisStore.clearAnalyses()
    clearToken()
    state.user = {} as User
  }

  return {
    user,
    token,
    isLoading,
    isLogged,
    state,
    login,
    register,
    getMe,
    logout,
  }
})
