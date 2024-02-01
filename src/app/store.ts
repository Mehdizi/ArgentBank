import { Action, Store, ThunkDispatch, combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { RequestConfigurator, UserGateway } from "./features/authenticateUser/authenticateUser";
import { AuthenticationGateway } from "./dependencies/AuthenticationGateway/authenticationGateway";
import { ChangeNameGateway } from "./features/changeNameUser/changeNameUser";
import { StorageProvider } from "./dependencies/StorageProvider/StorageProvider";
import { TokenGateway } from "./dependencies/TokenGateway/TokenGateway";

export interface Dependencies {
  storageProvider: StorageProvider,
  userGateway: UserGateway,
  changeNameGateway: ChangeNameGateway,
  authenticationGateway: AuthenticationGateway,
  requestConfigurator: RequestConfigurator
  tokenGateway: TokenGateway
}

export const reducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
})

export const initReduxStore = (dependencies: Partial<Dependencies>, preloadedState?: Partial<RootState>): ReduxStore => {
  return configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"]
        },
        thunk: {
          extraArgument: dependencies
        }
      })
    },
    preloadedState
  })
}

export type RootState = ReturnType<typeof reducer>;

export type ReduxStore = Store<RootState> & {
  dispatch: ThunkAppDispatch;
};

export type ThunkAppDispatch = ThunkDispatch<RootState, Dependencies, Action>;