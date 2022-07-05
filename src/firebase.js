// https://instagram-clone-react-f25f5.web.app/
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxRlPe9yqh3vUplFMXrzjiJofsagC4NS4",
  authDomain: "instagram-clone-react-f25f5.firebaseapp.com",
  projectId: "instagram-clone-react-f25f5",
  storageBucket: "instagram-clone-react-f25f5.appspot.com",
  messagingSenderId: "410747897788",
  appId: "1:410747897788:web:27d83c3b4d155b0dc64db9",
  measurementId: "G-V46MT4TRYW"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage= firebase.storage();

export{ db, auth, storage};
