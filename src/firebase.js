import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "projetipdl-423f6.firebaseapp.com",
  projectId: "projetipdl-423f6",
  storageBucket: "projetipdl-423f6.appspot.com",
  messagingSenderId: "615047213817",
  appId: "1:615047213817:web:XXXXXXXXXXXXXXXXXXXXXX"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
