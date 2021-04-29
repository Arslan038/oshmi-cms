import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDnMCN0AS56HdwDHbopEXjrLoTLcHcuoc8",
    authDomain: "oshmi-eca3e.firebaseapp.com",
    databaseURL: "https://oshmi-eca3e-default-rtdb.firebaseio.com",
    projectId: "oshmi-eca3e",
    storageBucket: "oshmi-eca3e.appspot.com",
    messagingSenderId: "45696594828",
    appId: "1:45696594828:web:7932ca4fc2d90dd2449ca9",
    measurementId: "G-MCQS1J7448"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  db.settings({ timestampsInSnapshots: true })
  export default db
