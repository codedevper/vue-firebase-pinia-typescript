// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {//}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export { auth, database, storage }
