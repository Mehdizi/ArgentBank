import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../slices/user"
import { RootState } from "../../store"
import { StorageProvider } from "../../dependencies/StorageProvider/StorageProvider"

export type UserNameType = {
  newFirstName: string,
  newLastName: string
}

export interface ChangeNameGateway {
  editName: ({ newFirstName, newLastName }: UserNameType, token: string) => Promise<User>
}

export const changeUserName = createAsyncThunk<User, UserNameType, {
  state: RootState,
  extra: {
    storageProvider: StorageProvider
    changeNameGateway: ChangeNameGateway
  }
}>("changeUserName", async ({ newFirstName, newLastName }, { extra }) => {
  const storedToken = extra.storageProvider.retrieve({ key: "token" })
  const { firstName, lastName, id } = await extra.changeNameGateway.editName({
    newFirstName,
    newLastName
  }, storedToken)
  return { firstName, lastName, id }
})

