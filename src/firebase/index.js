import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBFWGopMRF_qyOlIjwoBgUYT1JFj6u9zvs",
    authDomain: "argus-prod-3cfef.firebaseapp.com",
    projectId: "argus-prod-3cfef",
    storageBucket: "argus-prod-3cfef.appspot.com",
    messagingSenderId: "452549828219",
    appId: "1:452549828219:web:275eec28e8ea6bfe698cde",
    measurementId: "G-V5G5NDZ11X"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
export {
    storage, firebase as default
}