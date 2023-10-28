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
import authSlice from "./auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "headingExamination",
    "headingReception",
    "headingBooking",
    "headingWaiting",
    "auth",
  ],
};

const reducer = combineReducers({
  headingExamination: headingExaminationReducer,
  headingReception: headingReceptionReducer,
  headingBooking: headingBookingReducer,
  headingPrescription: headingPrescriptionSlice.reducer,
  headingWaiting: headingWaiting.reducer,
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
