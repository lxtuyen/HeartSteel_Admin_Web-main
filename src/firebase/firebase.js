// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD1JSh_DZzm9ZAT2ORJ6eg2Iz91KfzI6E",
  authDomain: "heartsteel-c5abc.firebaseapp.com",
  databaseURL: "https://heartsteel-c5abc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heartsteel-c5abc",
  storageBucket: "heartsteel-c5abc.appspot.com",
  messagingSenderId: "361688273655",
  appId: "1:361688273655:web:623e8d94dfe51806e779f2",
  measurementId: "G-WNTQTZNF03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}