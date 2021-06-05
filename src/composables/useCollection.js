import { auth, usersRef, accountsRef, transactionsRef } from "../firebase";

// Get user account.
const getAccount = async (user) => {
  const account = await accountsRef.doc(user.uid).get();

  return account.data();
}

export { getAccount }