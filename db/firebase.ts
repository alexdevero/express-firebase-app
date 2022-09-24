import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import dotEnv from 'dotenv'

dotEnv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

if (!firebaseConfig.apiKey) {
  throw new Error('Missing Firebase API Key')
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
