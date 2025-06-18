import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DetailView from '@/views/DetailView.vue'
import NofFoundView from '@/views/NofFoundView.vue'

const { cookies } = useCookies()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:id',
      name: 'detail',
      component: DetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/404',
      name: '404',
      component: NofFoundView,
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/404',
    // },
  ],
})

router.beforeEach((to) => {
  const refreshToken = cookies.get('refreshToken')
  const isAuthenticated = !!refreshToken

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return '/'
  }
})

export default router
