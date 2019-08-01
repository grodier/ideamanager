import {
  createNewUser,
  createUserDocument,
  signInUser,
  signOutUser,
  handleUserStateChanged,
  getCurrentUser
} from './user';

async function signUpUser(email, password, firstName, lastName) {
  const { error, data } = await createNewUser(email, password);
  if (error) {
    throw error;
  } else if (data && data.user) {
    try {
      return await createUserDocument(data.user, { firstName, lastName });
    } catch (error) {
      throw error;
    }
  }

  throw new Error('Fatal Error - new user created but user never returned');
}

function userStateChangedHandler(userHandler) {
  async function onUserStateChanged(user) {
    if (user) {
      try {
        const userData = await createUserDocument(user);
        userHandler(userData);
      } catch {
        userHandler(user);
      }
    } else {
      userHandler(user);
    }
  }
  return handleUserStateChanged(onUserStateChanged);
}

const firebaseDatasource = {
  signUpUser: signUpUser,
  signInUser: signInUser,
  signOutUser,
  getUserInfo: createUserDocument,
  handleUserStateChanged: userStateChangedHandler,
  getCurrentUser
};

export default firebaseDatasource;
