import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAGf4Ks-0wlwrr2cpwN4sh7bZXlwTaMG24",
  authDomain: "ross-bankish.firebaseapp.com",
  projectId: "ross-bankish",
  storageBucket: "ross-bankish.appspot.com",
  messagingSenderId: "393571155521",
  appId: "1:393571155521:web:34762facca8dc2872b50c0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ************ Firebase References ********* //
const auth = firebase.auth();
const db = firebase.firestore();

const accountsRef = db.collection("accounts");
const usersRef = db.collection("users");
const transactionsRef = db.collection("transactions");

// Update firestore settings
//db.settings({ timestampsInSnapshots: true });
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, accountsRef, usersRef, transactionsRef, timestamp }
