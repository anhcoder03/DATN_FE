import firebase from "firebase/app";
import "firebase/messaging";
import {
  createNotifyToken,
  getAllNotifyToken,
} from "../services/notifyToken.service";

const firebaseConfig = {
  apiKey: "AIzaSyCXvOQf6nsQr42mwK_1bzABTcoJ-65dCOs",
  authDomain: "medipro-fpoly.firebaseapp.com",
  projectId: "medipro-fpoly",
  storageBucket: "medipro-fpoly.appspot.com",
  messagingSenderId: "576687108742",
  appId: "1:576687108742:web:f0d29f3834ded1f8385707",
  measurementId: "G-D443NCRH2R",
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
        "BKMuGA7Z7GP2PV4Bh2AOQixlIsPScFXer7TSIsXb-cXZjxUbQAiQZH2Aw0iTDB234yFakgB8iKob6O8cE99DoBs",
    });
    const registrationTokens = await getAllNotifyToken();

    if (
      !registrationTokens ||
      (registrationTokens && !registrationTokens.includes(currentToken))
    ) {
      await createNotifyToken({ notifyToken: currentToken });
    }

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
