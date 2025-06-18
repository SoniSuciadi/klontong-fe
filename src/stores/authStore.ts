import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type AxiosResponse, type AxiosError } from 'axios'
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

  const login = async (data: LoginPayload) => {
    loading.value = true
    try {
      const response: AxiosResponse<Data<LoginResponse>> = await userLogin(data)
      user.value = response.data.data
    } catch (err) {
      const axiosError = err as AxiosError
      console.error(axiosError)
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterPayload): Promise<void> => {
    loading.value = true
    try {
      const response: AxiosResponse<Data<RegisterResponse>> = await userRegister(data)
      user.value = response.data.data

      showSnackbar('success', 'User created successfully!')
    } catch (err) {
      console.error(err)
      showSnackbar('error', 'Error creating user!')
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
