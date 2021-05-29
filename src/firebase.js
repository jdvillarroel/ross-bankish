import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

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
export const auth = firebase.auth();
export const db = firebase.firestore();
const storage = firebase.storage();

const accountsRef = db.collection("accounts");
const usersRef = db.collection("users");
const transactionsRef = db.collection("transactions");

// Update firestore settings
//db.settings({ timestampsInSnapshots: true });

// *************** Functions ********************* //
// Create user in firebase using email and password. Returns new user created.
export const createUser = async (userInfo) => {
  const userCredential = await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
  const userAccount = await usersRef.doc(userCredential.user.uid).set({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      createdAt: new Date()
  });
  
  return userCredential.user;
}

export const loginUser = async (userInfo) => {
  const userLoggedIn = await auth.signInWithEmailAndPassword(userInfo.email, userInfo.password);

  return userLoggedIn;
}

export const logout = () => {
  auth.signOut();
}
