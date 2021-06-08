import { auth, usersRef, accountsRef, transactionsRef, timestamp } from "../firebase";

const createUser = async (userInfo) => {
    const userCredential = await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);

    const userAccount = await accountsRef.doc(userCredential.user.uid).set({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      balance: 0,
      createdAt: timestamp(),
      type: "regular"
    });

    const userTransactions = await transactionsRef.doc(userCredential.user.uid).set({
      transactions: []
    });
    
    return userCredential.user;
}

const login = async (userInfo) => {
  const userLoggedIn = await auth.signInWithEmailAndPassword(userInfo.email, userInfo.password);

  return userLoggedIn.user;
}

const logout = () => {
  auth.signOut();
}

const currentUser = () => {
  return auth.currentUser;
}

export { createUser, login, logout, currentUser }