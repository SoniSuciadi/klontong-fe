import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type AxiosResponse } from 'axios'
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/service/auth/types'
import type { Data } from '@/service/types'
import { userLogin, userRegister } from '@/service/auth'
import { useSnackbarStore } from './snackbarStore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<LoginResponse | RegisterResponse | { accessToken: string } | null>(null)
  const loading = ref<boolean>(false)
  const { showSnackbar } = useSnackbarStore()

  const setUser = (data: LoginResponse | RegisterResponse) => {
    user.value = data
  }

  const login = async (data: LoginPayload) => {
    loading.value = true
    try {
      const response: AxiosResponse<Data<LoginResponse>> = await userLogin(data)
      setUser(response.data.data)
      showSnackbar('success', 'Login successful!')
      return response
    } catch (err) {
      showSnackbar('error', 'Login failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterPayload): Promise<void> => {
    loading.value = true
    try {
      const response: AxiosResponse<Data<RegisterResponse>> = await userRegister(data)
      setUser(response.data.data)
      showSnackbar('success', 'User created successfully!')
    } catch (err) {
      showSnackbar('error', 'Registration failed')
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    login,
    register,
  }
})
