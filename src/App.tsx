import React, { Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";

import { getMessagingToken, onMessageListener } from "./firebase";

import AppRouter from "./routes/router";

const DEFAULT_NOTIFY = {
  title: "",
  body: "",
  link: "",
};

function App() {
  const [notify, setNotify] = useState(DEFAULT_NOTIFY);
  useEffect(() => {
    getMessagingToken();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const payload = await onMessageListener();
        // fetch api Notification
        // bật toast hiển thị thông tin thông báo, bấm vào bất kỳ đoạn nào trong thông báo cũng redirect đến link trong thông báo được.
        console.log("Receive In-App notification SUCCEED:", payload);
      } catch (error) {
        console.log("Receive In-App notification ERROR:", error);
      }
    })();
  });

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <AppRouter />
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
