import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAyb7Es93LbrjMS24MRe4u7QUvZFxJYhbc",
  authDomain: "social-network-a57ab.firebaseapp.com",
  projectId: "social-network-a57ab",
  storageBucket: "social-network-a57ab.appspot.com",
  messagingSenderId: "810768652918",
  appId: "1:810768652918:web:89f47b5a919730b1a65d57"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);