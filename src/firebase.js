import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLJAnj1mc2d8yFx8KySssIROpjfw-QeCo",
  authDomain: "inha-84789.firebaseapp.com",
  databaseURL: "https://inha-84789-default-rtdb.firebaseio.com",
  projectId: "inha-84789",
  storageBucket: "inha-84789.firebasestorage.app",
  messagingSenderId: "27456861863",
  appId: "1:27456861863:web:8cbb2bdd788624db94cd82"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app };