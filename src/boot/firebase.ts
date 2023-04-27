import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAk4K5N2Auhi4fKogGOf67-t7ewICC85js",
  authDomain: "qwitter-84e89.firebaseapp.com",
  projectId: "qwitter-84e89",
  storageBucket: "qwitter-84e89.appspot.com",
  messagingSenderId: "124431090171",
  appId: "1:124431090171:web:95bbc044979af08cff8b5e"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

export default db;
