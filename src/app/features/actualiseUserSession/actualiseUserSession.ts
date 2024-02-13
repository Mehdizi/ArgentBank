import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../slices/user";
import { StorageProvider } from "../../dependencies/StorageProvider/StorageProvider";
import { UserGateway } from "../authenticateUser/authenticateUser";
import { TokenGateway } from "../../dependencies/TokenGateway/TokenGateway";


export const actualiseUserSession = createAsyncThunk<User, void, {
  state: RootState,
  extra: {
    storageProvider: StorageProvider
    tokenGateway: TokenGateway;
    userGateway: UserGateway
  }
}>("actualiseUserSession", async (_, { extra, rejectWithValue, }) => {
  const storedToken = extra.storageProvider.retrieve({ key: "token" })

  const { validatedToken } = await extra.tokenGateway.verify(storedToken)

  if (!validatedToken) {
    extra.storageProvider.remove({ key: "token" })
    return rejectWithValue("token expired")
  }

  return (await extra.userGateway.loadProfile(validatedToken))
})


