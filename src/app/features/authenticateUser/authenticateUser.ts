import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../slices/user";
import { AuthenticationGateway } from "../../dependencies/AuthenticationGateway/authenticationGateway";
import { StorageProvider } from "../../dependencies/StorageProvider/StorageProvider";

type AuthenticationProps = {
  email: string,
  password: string
}

export interface RequestConfigurator {
  defineToken: (token: string) => void
}

export interface UserGateway {
  loadProfile: (token: string) => Promise<User>
}


export const authenticateUser = createAsyncThunk<User, AuthenticationProps, {
  state: RootState,
  extra: {
    authenticationGateway: AuthenticationGateway
    storageProvider: StorageProvider
    userGateway: UserGateway;
    requestConfigurator: RequestConfigurator;
  }
}>("authenticateUser", async ({ email, password }, { extra }) => {
  try {
    const { token } = await extra.authenticationGateway.login({
      email,
      password,
    })

    const user = await extra.userGateway.loadProfile(token)

    extra.storageProvider.store({ key: "token", value: token })
    extra.requestConfigurator.defineToken(token)

    return user
  } catch (e: any) {
    throw new Error(e.response.status)
  }
})


