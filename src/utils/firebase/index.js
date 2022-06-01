import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDsJFUY_v1XQ4fPcLr_URbSPPxGlh1w3Jg",
  authDomain: "myshop-pivot.firebaseapp.com",
  projectId: "myshop-pivot",
  storageBucket: "myshop-pivot.appspot.com",
  messagingSenderId: "933795675109",
  appId: "1:933795675109:web:3377da68ae5e26989d0d0c",
  measurementId: "G-PNCDLP7ELQ"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
