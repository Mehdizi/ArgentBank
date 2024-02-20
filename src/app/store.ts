import { Action, Reducer, Store, ThunkDispatch, combineReducers, configureStore, } from "@reduxjs/toolkit";
import { UserGateway } from "./features/authenticateUser/authenticateUser";
import { AuthenticationGateway } from "./dependencies/AuthenticationGateway/authenticationGateway";
import { StorageProvider } from "./dependencies/StorageProvider/StorageProvider";
import { TokenValidator } from "./dependencies/TokenGateway/TokenValidator";
import { userSlice } from "./slices/user";
import { EditUserNameGateway } from "./dependencies/EditUserName/EditUserNameGateway";


export interface Dependencies {
  storageProvider: StorageProvider,
  userGateway: UserGateway,
  editUserNameGateway: EditUserNameGateway,
  authenticationGateway: AuthenticationGateway,
  tokenValidator: TokenValidator
}

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
})

export const initReduxStore = ({ dependencies, preloadedState, reducer = rootReducer }: { dependencies: Partial<Dependencies>, preloadedState?: RootState, reducer?: Reducer }): ReduxStore => {
  return configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        ignoredActions: ["persist/PERSIST"],
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