// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz53w4hWFtjFD9CMN_gjm4gTa_q0Xkkek",
  authDomain: "politicool-66e0f.firebaseapp.com",
  projectId: "politicool-66e0f",
  storageBucket: "politicool-66e0f.appspot.com",
  messagingSenderId: "410375845277",
  appId: "1:410375845277:web:ae1ed7b4d5b18a8c0f2b74",
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
    console.error("Error initializing app: " + error);
  }
} else {
  FIREBASE_APP = getApp();
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
  FIRESTORE_DB = getFirestore(FIREBASE_APP);
}

// Initialize Firebase
export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };
