import { useAuthStore } from '@/stores/authStore'

const redirectOnLoggedIn = (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) next({ name: 'account' })
  else next()
}

const auth = [
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import('@/views/auth/SignUp.vue'),
    beforeEnter: redirectOnLoggedIn
  },
  {
    path: '/auth/signin',
    name: 'auth-signin',
    component: () => import('@/views/auth/SignIn.vue'),
    beforeEnter: redirectOnLoggedIn
  }
]

export default auth
