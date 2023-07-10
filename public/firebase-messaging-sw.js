importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
   apiKey: "AIzaSyBuHA26T7bwuR3cpxk1YLoTMNvqiRMfuYg",
   authDomain: "fir-push-notification-41fd2.firebaseapp.com",
   projectId: "fir-push-notification-41fd2",
   storageBucket: "fir-push-notification-41fd2.appspot.com",
   messagingSenderId: "805786388350",
   appId: "1:805786388350:web:dc7cc0ade0de235450d52f",
   measurementId: "G-7JML561EKH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});