import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHSl7snLjt7_GlGFsOiwzWan_91ljWNus",
  authDomain: "projetipdl-423f6.firebaseapp.com",
  projectId: "projetipdl-423f6",
  storageBucket: "projetipdl-423f6.appspot.com",
  messagingSenderId: "615047213817",
  appId: "1:615047213817:web:627213e9d3e7e3647ba828",
  measurementId: "G-JDTWFZEEFH"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
