import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';
export const firebaseConfig = {
  apiKey: 'AIzaSyApoey26jibvdgCAv-wpV_XUGgev_eSUv4',
  authDomain: 'chatbot-ynuf.firebaseapp.com',
  projectId: 'chatbot-ynuf',
  storageBucket: 'chatbot-ynuf.appspot.com',
  messagingSenderId: '962628463512',
  appId: '1:962628463512:web:f8dda2f36e857b00a599ed',
  measurementId: 'G-V2Q6BB73R4',
};
const firebaseCloudMessaging = {
  init: async (): Promise<string> => {
    console.log("🚀 ~ file: firebase.ts:16 ~ init: ~ firebase?.apps?.length:", firebase?.apps?.length)
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp(firebaseConfig);

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage: string = await localforage.getItem(
          'fcm_token'
        );
        console.log("🚀 ~ file: firebase.ts:25 ~ init: ~ tokenInLocalForage:", tokenInLocalForage)

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
          });
          console.log("🚀 ~ file: firebase.ts:37 ~ init: ~ fcm_token:", fcm_token)

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('fcm_token', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },

  onMessageListener: () =>
    new Promise((resolve) => {
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        resolve(payload);
      });
    }),
};

export { firebaseCloudMessaging };
