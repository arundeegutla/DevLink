import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBada3tsvZTZ9IjFvnLgWOu6WfKIuLRmfQ',
  authDomain: 'fir-experimenting-cb657.firebaseapp.com',
  projectId: 'fir-experimenting-cb657',
  storageBucket: 'fir-experimenting-cb657.appspot.com',
  messagingSenderId: '488893457194',
  appId: '1:488893457194:web:6822408adaab89b8557453',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

