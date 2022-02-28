import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCe5e9K4H9CB4ipJmyMNttkOX_UTqeZwnQ",
    authDomain: "instagram-clone-8a613.firebaseapp.com",
    projectId: "instagram-clone-8a613",
    storageBucket: "instagram-clone-8a613.appspot.com",
    messagingSenderId: "644070727190",
    appId: "1:644070727190:web:65de41251c922046ce9f37",
    measurementId: "G-97KNBK4LHE"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }