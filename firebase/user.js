import firebase, { firestore, auth } from './firebase';

export function createNewUser(email, password) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

export function signInUser(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

export function signOutUser() {
  return auth
    .signOut()
    .then(() => ({ error: null }))
    .catch(error => ({ error }));
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function handleUserStateChanged(handler) {
  return auth.onAuthStateChanged(handler);
}

export async function createUserDocument(user, additionalData) {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    console.log({ user }, displayName, email, photoURL, createdAt);
    try {
      await userRef.set({
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user', error.message);
      throw error;
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection('users')
      .doc(uid)
      .get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
