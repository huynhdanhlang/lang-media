importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyApoey26jibvdgCAv-wpV_XUGgev_eSUv4',
  authDomain: 'chatbot-ynuf.firebaseapp.com',
  projectId: 'chatbot-ynuf',
  storageBucket: 'chatbot-ynuf.appspot.com',
  messagingSenderId: '962628463512',
  appId: '1:962628463512:web:f8dda2f36e857b00a599ed',
  measurementId: 'G-V2Q6BB73R4',
});

const messaging = firebase.messaging();
