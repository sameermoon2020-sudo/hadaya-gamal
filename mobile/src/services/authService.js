import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signUp = async (email, password, name, phone) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    await axios.post(`${API_URL}/auth/register`, {
      uid: userId,
      email,
      name,
      phone,
      createdAt: new Date(),
    });

    await firestore().collection('users').doc(userId).set({
      uid: userId,
      email,
      name,
      phone,
      profileImage: '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      verified2FA: false,
    });

    return {
      success: true,
      userId,
      user: userCredential.user,
    };
  } catch (error) {
    console.log('Sign up error:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    
    const userDoc = await firestore()
      .collection('users')
      .doc(userCredential.user.uid)
      .get();

    return {
      success: true,
      user: userCredential.user,
      need2FA: userDoc.data()?.verified2FA || false,
    };
  } catch (error) {
    console.log('Sign in error:', error);
    throw error;
  }
};

export const sendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-verification`, { email });
    return response.data;
  } catch (error) {
    console.log('Error sending verification code:', error);
    throw error;
  }
};

export const verify2FA = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-2fa`, { email, code });
    return response.data;
  } catch (error) {
    console.log('Error verifying 2FA:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    console.log('Sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = () => auth().currentUser;

export const getIdToken = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.log('Error getting ID token:', error);
    throw error;
  }
};