// Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import {getFirestore} from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';
import firebase from 'firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDaN81D3pg34fYjV3JvhszRqc-A26ZxqfM",
    authDomain: "wehelp-stage3-reactpract-afe21.firebaseapp.com",
    projectId: "wehelp-stage3-reactpract-afe21",
    storageBucket: "wehelp-stage3-reactpract-afe21.appspot.com",
    messagingSenderId: "41078670516",
    appId: "1:41078670516:web:ae45261263aaee8f9783e1"
  };

// Initialize Firebase if this project is not initialized
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

export { firestore };

// Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import {getFirestore} from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';
// const db2 = getFirestore(app);
// const db = firebaseApp.firestore();
// const auth = getAuth();

// export {db, auth}