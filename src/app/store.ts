import { Action, Reducer, Store, ThunkDispatch, combineReducers, configureStore, } from "@reduxjs/toolkit";
import { RequestConfigurator, UserGateway } from "./features/authenticateUser/authenticateUser";
import { AuthenticationGateway } from "./dependencies/AuthenticationGateway/authenticationGateway";
import { ChangeNameGateway } from "./features/changeNameUser/changeNameUser";
import { StorageProvider } from "./dependencies/StorageProvider/StorageProvider";
import { TokenGateway } from "./dependencies/TokenGateway/TokenGateway";
import { userSlice } from "./slices/user";


export interface Dependencies {
  storageProvider: StorageProvider,
  userGateway: UserGateway,
  changeNameGateway: ChangeNameGateway,
  authenticationGateway: AuthenticationGateway,
  requestConfigurator: RequestConfigurator
  tokenGateway: TokenGateway
}

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
})

export const initReduxStore = ({ dependencies, preloadedState, reducer = rootReducer }: { dependencies: Partial<Dependencies>, preloadedState?: RootState, reducer?: Reducer }): ReduxStore => {
  return configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies
        }
      })
    },
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;

export type ReduxStore = Store<RootState> & {
  dispatch: ThunkAppDispatch;
};

export type ThunkAppDispatch = ThunkDispatch<RootState, Dependencies, Action>;