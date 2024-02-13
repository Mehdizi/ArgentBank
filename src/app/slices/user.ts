import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authenticateUser } from "../features/authenticateUser/authenticateUser";
import { changeUserName } from "../features/changeNameUser/changeNameUser";
import { actualiseUserSession } from "../features/actualiseUserSession/actualiseUserSession";
import { logoutUser } from "../features/logoutUser/logoutUser";

export type User = {
  id: string,
  firstName: string,
  lastName: string,
}
type UserSlice = User & { isLogged: boolean }

const initialState: UserSlice = {
  isLogged: false,
  id: "",
  firstName: "",
  lastName: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(logoutUser.fulfilled, actualiseUserSession.rejected), (state, action) => {
      return initialState
    })
    builder.addMatcher(isAnyOf(authenticateUser.fulfilled, actualiseUserSession.fulfilled, changeUserName.fulfilled), (state, action) => {
      const { firstName, lastName, id } = action.payload
      return {
        isLogged: true,
        firstName,
        lastName,
        id
      }
    })
  }

})


