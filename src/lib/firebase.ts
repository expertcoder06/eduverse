
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "eduverse-q7upi",
  "appId": "1:868718268938:web:b595c38c205982912205f3",
  "storageBucket": "eduverse-q7upi.firebasestorage.app",
  "apiKey": "AIzaSyARGpTcna4VRU9VA9KxWgLcYmVp9lBwdcY",
  "authDomain": "eduverse-q7upi.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "868718268938"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let db: Firestore;

// Check if we are in the browser before initializing Firestore
if (typeof window !== 'undefined') {
  db = getFirestore(app);
}

export { app, db };
