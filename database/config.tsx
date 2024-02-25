import { FirebaseFirestore } from "@firebase/firestore-types";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoUcp-RfRSUSou30d48izbw1r2q0ZibIo",
  authDomain: "iteminventory-d5ebd.firebaseapp.com",
  databaseURL: "https://iteminventory-d5ebd-default-rtdb.firebaseio.com",
  projectId: "iteminventory-d5ebd",
  storageBucket: "iteminventory-d5ebd.appspot.com",
  messagingSenderId: "548039182472",
  appId: "1:548039182472:web:fa8d75caa1516c3fb5b73d"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);