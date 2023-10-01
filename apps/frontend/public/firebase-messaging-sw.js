// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyApoey26jibvdgCAv-wpV_XUGgev_eSUv4',
  authDomain: 'chatbot-ynuf.firebaseapp.com',
  projectId: 'chatbot-ynuf',
  storageBucket: 'chatbot-ynuf.appspot.com',
  messagingSenderId: '962628463512',
  appId: '1:962628463512:web:f8dda2f36e857b00a599ed',
  measurementId: 'G-V2Q6BB73R4',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

const getFirebaseToken = async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY);
    const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY });
    console.log("🚀 ~ file: init-firebase.ts:27 ~ getFirebaseToken ~ currentToken:", currentToken)
    if (!currentToken) {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await getFirebaseToken();
    }
  } catch (error) {
    console.log("An error occurred while getting user permission. ", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });