import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";
import AppRouter from "./routes/router";
import "react-toastify/dist/ReactToastify.css";
import { getMessagingToken } from "./firebase";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { message } from "antd";

export const socketIO = io("https://api-medipro.onrender.com/", {
  transports: ["websocket"],
});

function App() {
  const userId = useSelector((data: any) => data?.auth?.auth?.user._id);

  useEffect(() => {
    if (userId) {
      socketIO.emit("authenticate", userId);
      return () => {
        socketIO.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    getMessagingToken();
  }, []);

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
