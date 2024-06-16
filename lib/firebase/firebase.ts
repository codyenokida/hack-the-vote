// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHd06Z50W0yaBd_4VTHYa1BhragUPdD3o",
  authDomain: "hack-the-vote-8644a.firebaseapp.com",
  projectId: "hack-the-vote-8644a",
  storageBucket: "hack-the-vote-8644a.appspot.com",
  messagingSenderId: "804434995857",
  appId: "1:804434995857:web:55d1c11ed8ea2f4271ad30",
};

let FIREBASE_APP;
let FIREBASE_AUTH;
let FIRESTORE_DB;

if (!getApps().length) {
  try {
    FIREBASE_APP = initializeApp(firebaseConfig);
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    FIRESTORE_DB = getFirestore(FIREBASE_APP);
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  FIREBASE_APP = getApp();
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
  FIRESTORE_DB = getFirestore(FIREBASE_APP);
}

// Initialize Firebase
export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };
