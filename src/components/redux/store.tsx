import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headingExaminationReducer from "./headingExaminationSlice";
import headingReceptionReducer from "./headingReceptionSlice";
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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["headingExamination", "headingReception"],
};

const reducer = combineReducers({
  headingExamination: headingExaminationReducer,
  headingReception: headingReceptionReducer,
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
