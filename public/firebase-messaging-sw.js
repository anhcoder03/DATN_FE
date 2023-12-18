importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyByC1PeyYFp9egNMgdrMZ4--mNAEsAQclU",
  authDomain: "fpoly-medipro.firebaseapp.com",
  projectId: "fpoly-medipro",
  storageBucket: "fpoly-medipro.appspot.com",
  messagingSenderId: "617861732796",
  appId: "1:617861732796:web:f329bf742b95ff98d2f3b9",
  measurementId: "G-3EFC71TGQV",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.info("[firebase-messageing-sw.js] Received notify:", payload);
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
