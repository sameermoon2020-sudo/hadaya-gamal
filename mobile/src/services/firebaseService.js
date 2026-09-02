import * as Firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let firebaseApp;
try {
  firebaseApp = Firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.log('Firebase already initialized');
}

export const registerForPushNotifications = async () => {
  try {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken();
      return token;
    }
  } catch (error) {
    console.log('Error registering for push notifications:', error);
  }
};

export const uploadImage = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref(path);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    console.log('Error uploading image:', error);
    throw error;
  }
};

export const getFirestore = () => firestore();
export const getAuth = () => auth();
export const getMessaging = () => messaging();