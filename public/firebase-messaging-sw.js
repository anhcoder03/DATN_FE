importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCXvOQf6nsQr42mwK_1bzABTcoJ-65dCOs",
  authDomain: "medipro-fpoly.firebaseapp.com",
  projectId: "medipro-fpoly",
  storageBucket: "medipro-fpoly.appspot.com",
  messagingSenderId: "576687108742",
  appId: "1:576687108742:web:f0d29f3834ded1f8385707",
  measurementId: "G-D443NCRH2R",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received Background notification SUCCEDD:", payload);

  const { title, body, link } = payload.data;
  const notificationOptions = {
    body,
    icon: "https://res.cloudinary.com/mediapro-cloud/image/upload/v1701252620/mediaPro-DATN/logo-icon_jfhiit.png",
  };
  self.registration.showNotification(title, notificationOptions);

  self.addEventListener("notificationclick", (event) => {
    if (link) {
      event.waitUntil(clients.openWindow(link));
    }
    event.notification.close();
  });
});
