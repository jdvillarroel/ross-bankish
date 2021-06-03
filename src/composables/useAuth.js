import { ref, watchEffect } from "vue";
import { auth } from "../firebase";


const createUser = async (userInfo) => {
    const userCredential = await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    
    return userCredential.user;
}

const login = async (userInfo) => {
  const userLoggedIn = await auth.signInWithEmailAndPassword(userInfo.email, userInfo.password);

  return userLoggedIn;
}

const logout = () => {
  auth.signOut();
}

const currentUser = () => {
  return auth.currentUser;
}

export { createUser, login, logout, currentUser }