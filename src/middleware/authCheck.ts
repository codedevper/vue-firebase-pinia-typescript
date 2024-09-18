import { useAuthStore } from '@/stores/authStore'

export default function authMiddleware(to: any, from: any, next: any) {
  const authStore = useAuthStore()

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือยัง
  if (!authStore.user) {
    // ถ้ายังไม่ล็อกอิน redirect ไปหน้า home หรือ login
    next({ name: 'auth-signin' })
  } else {
    // ถ้าล็อกอินแล้ว ไปหน้าที่ต้องการ
    next()
  }
}
