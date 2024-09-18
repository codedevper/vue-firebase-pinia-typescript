import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAccountStore } from '@/stores/accountStore'

import HomeView from '../views/HomeView.vue'
import auth from './auth'
import account from './account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    ...auth,
    ...account
  ]
})

// ใช้ router guard เพื่อทำ middleware
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const accountStore = useAccountStore()

  // ตรวจสอบว่า route ที่ต้องการไปต้องการ authentication หรือไม่
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // ถ้าผู้ใช้ยังไม่ล็อกอิน ให้ redirect ไปหน้า home หรือ login
    next({ name: 'auth-signin' })
  } else if (to.meta.requiresAuth && authStore.isLoggedIn) {
    accountStore.loadFromLocalStorage()
    next()
  } else {
    // ถ้าล็อกอินแล้วหรือ route ไม่ต้องการ authentication ให้ไปต่อ
    next()
  }
})

export default router
