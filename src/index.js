import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./uf-style.css";
import 'react-responsive-modal/styles.css';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter forceRefresh={false}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
