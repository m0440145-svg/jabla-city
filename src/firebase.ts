import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBissCvRl2lJg-KSLXXGRRiXG3do3WQhdM",
  authDomain: "jabla-city.firebaseapp.com",
  projectId: "jabla-city",
  storageBucket: "jabla-city.firebasestorage.app",
  messagingSenderId: "1014231375142",
  appId: "1:1014231375142:web:d8fd3ef44b781350a1b5e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
