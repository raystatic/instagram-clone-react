import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDwR2FS6hT9XNtK8GPB_BP9aMMcGO3pPno",
    authDomain: "instagram-clone-react-1b0ac.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-1b0ac.firebaseio.com",
    projectId: "instagram-clone-react-1b0ac",
    storageBucket: "instagram-clone-react-1b0ac.appspot.com",
    messagingSenderId: "444478111501",
    appId: "1:444478111501:web:c5828a7f58a7c1de5bfa44",
    measurementId: "G-9GK78R1MM0"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export {db, auth, storage};