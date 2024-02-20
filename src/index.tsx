import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.scss";
import App from "./App";
import { Provider } from "react-redux";
import { initReduxStore, rootReducer } from "./app/store";
import { AxiosAuthenticationGateway } from "./app/dependencies/AuthenticationGateway/AxiosAuthenticationGateway";
import { AxiosEditUserNameGateway } from "./app/dependencies/EditUserName/AxiosEditUserNameGateway";
import { LocalStorageProvider } from "./app/dependencies/StorageProvider/LocalStorageProvider";
import { LocalTokenValidator } from "./app/dependencies/TokenGateway/LocalTokenValidator";
import { AxiosUserGateway } from "./app/dependencies/UserGateway/AxiosUserGateway";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer
);

const store = initReduxStore({
  dependencies: {
    userGateway: new AxiosUserGateway(),
    storageProvider: new LocalStorageProvider(),
    editUserNameGateway: new AxiosEditUserNameGateway(),
    tokenValidator: new LocalTokenValidator(),
    authenticationGateway: new AxiosAuthenticationGateway(),
  },
  reducer: persistedReducer,
});

const persistedStore = persistStore(store);

root.render(
  <React.StrictMode>
    <PersistGate persistor={persistedStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
