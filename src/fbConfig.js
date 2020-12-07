import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyEbD0uiZnXNafL0r5qBCScvsqiH9WbAw",
    authDomain: "test-project-manager-a22ec.firebaseapp.com",
    projectId: "test-project-manager-a22ec",
    storageBucket: "test-project-manager-a22ec.appspot.com",
    messagingSenderId: "352722651843",
    appId: "1:352722651843:web:2210ead8e24d1b4f433076",
    measurementId: "G-E1TR0QT3JH"
  };

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase