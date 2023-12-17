import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headingExaminationReducer from "./layout/headingExaminationSlice";
import headingReceptionReducer from "./layout/headingReceptionSlice";
import headingBookingReducer from "./layout/headingBookingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import headingPrescriptionSlice from "./layout/headingPrescriptionSlice";
import { headingWaiting } from "./layout/HeadingWaiting";
import { headingDone } from "./layout/HeadingDone";
import { headingCancelling } from "./layout/HeadingCancelling";
import authSlice from "./auth/authSlice";
import notificationReducer from "./notification/notificationSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "headingExamination",
    "headingReception",
    "headingBooking",
    "headingWaiting",
    "headingCancelling",
    "auth",
  ],
};

const reducer = combineReducers({
  headingExamination: headingExaminationReducer,
  headingReception: headingReceptionReducer,
  headingBooking: headingBookingReducer,
  headingPrescription: headingPrescriptionSlice.reducer,
  headingWaiting: headingWaiting.reducer,
  headingDone: headingDone.reducer,
  headingCancelling: headingCancelling.reducer,
  notification: notificationReducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default persistor;
