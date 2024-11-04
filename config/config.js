import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxvPOSm4EsUXLDJ8CFMKXiqXkVr4zsjh8",
  authDomain: "data-master-mahasiswa-4db0d.firebaseapp.com",
  projectId: "data-master-mahasiswa-4db0d",
  storageBucket: "data-master-mahasiswa-4db0d.firebasestorage.app",
  messagingSenderId: "736672052617",
  appId: "1:736672052617:web:bd69be672d92b2ae991d58",
  measurementId: "G-5J4RX36YK9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
