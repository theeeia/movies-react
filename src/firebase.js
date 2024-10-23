// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkcv199tnnY2TOoSrFVY0ImqARYGBK6Wg",
  authDomain: "movies-react-14421.firebaseapp.com",
  projectId: "movies-react-14421",
  storageBucket: "movies-react-14421.appspot.com",
  messagingSenderId: "816692421680",
  appId: "1:816692421680:web:e576db15f5217c009c39f5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(firebaseApp);

export default db;
