import { defineStore } from 'pinia'
import { auth } from '@/lib/firebase'
import { updateProfile } from 'firebase/auth'

interface UserInfo {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  uid: string | null
}

export const useAccountStore = defineStore('account', {
  state: (): UserInfo => ({
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    uid: null
  }),
  actions: {
    async updateUserProfile(displayName: string | null) {
      try {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: displayName || auth.currentUser.displayName
          })
          this.displayName = displayName
          this.saveToLocalStorage(auth.currentUser)
        }
      } catch (error) {
        console.error('Update Profile failed:', error)
        throw error
      }
    },
    async updateUserPhoto(photoURL: string | null) {
      try {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            photoURL: photoURL || auth.currentUser.photoURL
          })
          this.photoURL = photoURL
          this.saveToLocalStorage(auth.currentUser)
        }
      } catch (error) {
        console.error('Update Profile failed:', error)
        throw error
      }
    },
    loadFromLocalStorage() {
      const storedProfile = localStorage.getItem('userCredential')
      if (storedProfile) {
        const { displayName, email, phoneNumber, photoURL, uid } = JSON.parse(storedProfile)
        this.displayName = displayName
        this.email = email
        this.phoneNumber = phoneNumber
        this.photoURL = photoURL
        this.uid = uid
      }
    },
    saveToLocalStorage(userCredential: any) {
      localStorage.setItem('userCredential', JSON.stringify(userCredential))
    }
  }
})
