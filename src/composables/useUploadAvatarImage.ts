import { storage, auth } from '@/lib/firebase'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

export function useUploadAvatarImage() {
  const uploadAvatarImage = async (file: File) => {
    try {
      if (!auth.currentUser) throw new Error('No authenticated user found')

      const fileType = file.type.replace('image/', '') // Extract file extension
      const newFileName = `${auth.currentUser.uid}.${fileType}` // Generate file name with UID
      const storageReference = storageRef(storage, `avatar/${newFileName}`) // Reference to the storage path

      // Upload the file to Firebase Storage
      await uploadBytes(storageReference, file)

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageReference)

      return downloadURL
    } catch (error) {
      console.error('Error uploading avatar image:', error)
      return null // Return null or handle errors based on your app's needs
    }
  }

  return { uploadAvatarImage }
}
