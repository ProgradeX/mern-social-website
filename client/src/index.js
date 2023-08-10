import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider, provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRTE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = { key: "root", storage, version: 1};
const persistReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRTE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
