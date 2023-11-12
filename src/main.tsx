import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import persistor, { store } from "./redux/store.tsx";
import "flatpickr/dist/themes/material_green.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
        />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
