import React, { Suspense, useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";

import { getMessagingToken, onMessageListener } from "./firebase";

import AppRouter from "./routes/router";
import { toast } from "react-toastify";

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

  const router_notify = (notify: any) => {
    return (
      <div>
        <Link to={notify?.link}>{notify?.body}</Link>
      </div>
    );
  };

  const toastify = (noti: any) => {
    console.log(noti);
    // setNotify(noti)
    return toast.info("Thông báo đẩy!!!!");
  };

  console.log("notify", notify);

  useEffect(() => {
    (async () => {
      try {
        const payload: any = await onMessageListener();
        toastify(payload?.data);
        // toastify();
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
