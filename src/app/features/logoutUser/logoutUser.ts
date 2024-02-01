import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { StorageProvider } from "../../dependencies/StorageProvider/StorageProvider";

export const logoutUser = createAsyncThunk<void, void, {
  state: RootState,
  extra: {
    storageProvider: StorageProvider
  }
}>("logoutUser", (_, { extra }) => {
  extra.storageProvider.remove({ key: "token" })
})