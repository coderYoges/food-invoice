import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { AuthInitialState } from "./reducer";
import AuthReducer from "./reducer";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireInTransform from "redux-persist-transform-expire-in";

const initialStoreState = {
  auth: AuthInitialState,
};

const appReducer = combineReducers({
  auth: AuthReducer,
});

const expireIn = 1000 * 60 * 60; // expire in 1hour
const expirationKey = "invoicePanel";

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
const persistConfig = {
  key: "invoicePanel",
  storage: storage,
  transforms: [expireInTransform(expireIn, expirationKey, [])],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialStoreState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
