import { initializeApp } from "@firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import {
  createNotifyToken,
  getOneNotifyToken,
} from "../services/notifyToken.service";

const firebaseConfig = {
  apiKey: "AIzaSyByC1PeyYFp9egNMgdrMZ4--mNAEsAQclU",
  authDomain: "fpoly-medipro.firebaseapp.com",
  projectId: "fpoly-medipro",
  storageBucket: "fpoly-medipro.appspot.com",
  messagingSenderId: "617861732796",
  appId: "1:617861732796:web:f329bf742b95ff98d2f3b9",
  measurementId: "G-3EFC71TGQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export const getMessagingToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMzM9oiKrAdybnTW_y0u9Edy5pJgEyth-MGRkRFj3td_bMsDc2JZwtkoTnleFQezcsOnpTfDEKEIKRD0JFzOD38",
    });

    if (currentToken) {
      const notifyToken = await getOneNotifyToken(currentToken);
      if (!notifyToken) {
        await createNotifyToken({ notifyToken: currentToken });
      }
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.log("ERROR while retrieving token: ", error);
  }
};
