import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import VueCookies from 'vue3-cookies'

import SnackbarToast from './components/SnackbarToast.vue'
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
  },
})
const baseURL = import.meta.env.VITE_API_BASE_URL
console.log('👻 ~ baseURL:', baseURL)
const app = createApp(App)
app.component('SnackbarToast', SnackbarToast)
app.use(VueCookies, {
  expireTimes: '7d',
  path: '/',
  domain: '',
  secure: false,
  sameSite: 'Lax',
})
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.mount('#app')
