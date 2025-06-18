export type LoginPayload = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export type RegisterResponse = {
  id: string
}
