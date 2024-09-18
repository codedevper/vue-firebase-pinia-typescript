import { defineStore } from 'pinia'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

interface AuthState {
  user: typeof auth.currentUser
  isLoggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') ? true : false
  }),
  actions: {
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        localStorage.setItem('userCredential', JSON.stringify(this.user))
        localStorage.setItem('isLoggedIn', 'true')
      } catch (error) {
        console.error('Register failed:', error)
        throw error
      }
    },
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        localStorage.setItem('userCredential', JSON.stringify(this.user))
        localStorage.setItem('isLoggedIn', 'true')
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        localStorage.removeItem('userCredential')
        localStorage.removeItem('isLoggedIn')
      } catch (error) {
        console.error('Logout failed:', error)
        throw error
      }
    },
    fetchUser() {
      onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
          this.user = userCredential
          localStorage.setItem('userCredential', JSON.stringify(this.user))
        } else {
          this.user = null
          localStorage.removeItem('userCredential')
          localStorage.removeItem('isLoggedIn')
        }
      })
    }
  }
})
