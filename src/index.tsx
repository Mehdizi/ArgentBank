import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.scss";
import App from "./App";
import { Provider } from "react-redux";
import { initReduxStore } from "./app/store";
import { AxiosAuthenticationGateway } from "./app/dependencies/AuthenticationGateway/AxiosAuthenticationGateway";
import { SpyRequestConfigurator } from "./app/dependencies/RequestConfigurator/SpyRequestConfigurator";
import { AxiosChangeNameGateway } from "./app/dependencies/EditName/AxiosChangeNameGateway";
import { LocalStorageProvider } from "./app/dependencies/StorageProvider/LocalStorageProvider";
import { AxiosTokenGateway } from "./app/dependencies/TokenGateway/AxiosRefreshGateway";
import { AxiosUserGateway } from "./app/dependencies/UserGateway/AxiosUserGateway";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = initReduxStore({
  userGateway: new AxiosUserGateway(),
  storageProvider: new LocalStorageProvider(),
  changeNameGateway: new AxiosChangeNameGateway(),
  tokenGateway: new AxiosTokenGateway(),
  authenticationGateway: new AxiosAuthenticationGateway(),
  requestConfigurator: new SpyRequestConfigurator(),
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
