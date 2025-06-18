<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <v-card class="auth-card">
              <v-toolbar color="primary">
                <v-toolbar-title class="toolbar-title">
                  <v-icon class="toolbar-icon">mdi-shield-account</v-icon>
                  <span class="toolbar-text">Sistem Login</span>
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text class="card-content">
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    type="email"
                    required
                    variant="outlined"
                    class="input-field"
                    color="primary"
                    placeholder="Email"
                    :rules="[rules.required, rules.email]"
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    variant="outlined"
                    color="primary"
                    class="input-field"
                    :rules="[rules.required]"
                    placeholder="Password"
                    @click:append-inner="showPassword = !showPassword"
                  />

                  <div class="forgot-password-container">
                    <v-btn
                      variant="text"
                      color="primary"
                      class="forgot-password-btn"
                      to="/forgot-password"
                    >
                      Lupa Password?
                    </v-btn>
                  </div>

                  <v-btn
                    type="submit"
                    color="primary"
                    block
                    size="large"
                    class="login-btn"
                    :loading="loading"
                  >
                    <v-icon left>mdi-login</v-icon>
                    Masuk
                  </v-btn>

                  <v-divider class="divider" />
                </v-form>
              </v-card-text>

              <v-card-actions class="card-actions">
                <v-btn variant="text" color="secondary" class="register-btn" to="/register">
                  Daftar Sekarang
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const { loading, login } = useAuthStore()

const rules = {
  required: (value: string) => !!value || 'Wajib diisi',
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Email tidak valid'
  },
}
const router = useRouter()
const handleLogin = async () => {
  try {
    await login({
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.auth-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  position: relative;
  z-index: 1;
}

.v-toolbar {
  background: linear-gradient(45deg, #2a72bb, #2196f3);
  padding: 16px;
}

.toolbar-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}

.toolbar-icon {
  margin-right: 12px;
  font-size: 2rem;
}

.card-content {
  padding: 24px;
}

.input-field {
  margin-bottom: 16px;
}

.forgot-password-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.forgot-password-btn {
  text-transform: capitalize;
  font-size: 0.875rem;
}

.login-btn {
  margin-top: 8px;
  margin-bottom: 24px;
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: normal;
}

.divider {
  margin: 16px 0;
}

.card-actions {
  padding: 16px 24px;
  justify-content: center;
}

.register-btn {
  text-transform: capitalize;
  font-weight: 500;
}

.v-btn--text:hover::before {
  opacity: 0.1 !important;
}

@media (max-width: 600px) {
  .auth-card {
    border-radius: 0;
  }

  .toolbar-title {
    font-size: 1.25rem;
  }

  .toolbar-icon {
    font-size: 1.75rem;
  }

  .card-content {
    padding: 16px;
  }
}
</style>
