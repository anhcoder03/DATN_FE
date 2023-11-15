import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCN7dlY5xzFuetxlyfbgHMDbFf2xeZ_UNg",
  authDomain: "medipro-70534.firebaseapp.com",
  projectId: "medipro-70534",
  storageBucket: "medipro-70534.appspot.com",
  messagingSenderId: "813333591051",
  appId: "1:813333591051:web:470ee5bbbecf89b774830e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging | null = null;

if (typeof window !== "undefined" && firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return currentToken;

  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BF5Qqv-QKdiuy5XOEWeKnlZflIRMyihZiBBXE-aSlJiOecUegO-9zAOK6HCmmZEDB4dQrNbJpZfFblTywPknyps",
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    messaging.onMessage((payload: any) => {
      resolve(payload);
    });
  });
