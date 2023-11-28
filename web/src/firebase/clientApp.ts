import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBada3tsvZTZ9IjFvnLgWOu6WfKIuLRmfQ',
  authDomain: 'fir-experimenting-cb657.firebaseapp.com',
  projectId: 'fir-experimenting-cb657',
  storageBucket: 'fir-experimenting-cb657.appspot.com',
  messagingSenderId: '488893457194',
  appId: '1:488893457194:web:6822408adaab89b8557453',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const fstorage = getStorage();
export const db = getFirestore(app);

