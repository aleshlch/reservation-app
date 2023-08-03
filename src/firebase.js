import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBAZE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAZE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBAZE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBAZE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBAZE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBAZE_APP_ID
}


const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
export const dbTables = getDatabase(app)
