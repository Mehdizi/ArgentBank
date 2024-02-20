import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../slices/user"
import { RootState } from "../../store"
import { StorageProvider } from "../../dependencies/StorageProvider/StorageProvider"
import { EditUserNameGateway, EditNameProps } from "../../dependencies/EditUserName/EditUserNameGateway"

export const editUserName = createAsyncThunk<Omit<User, "id">, Omit<EditNameProps, "token">, {
  state: RootState,
  extra: {
    storageProvider: StorageProvider
    editUserNameGateway: EditUserNameGateway
  }
}>("editUserName", async ({ newFirstName, newLastName }, { extra }) => {
  const storedToken = extra.storageProvider.retrieve({ key: "token" })
  await extra.editUserNameGateway.execute({
    newFirstName,
    newLastName,
    token: storedToken
  })
  return { firstName: newFirstName, lastName: newLastName }
})

