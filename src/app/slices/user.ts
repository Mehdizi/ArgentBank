import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authenticateUser } from "../features/authenticateUser/authenticateUser";
import { editUserName } from "../features/editUserName/editUserName";
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
    builder.addCase(editUserName.fulfilled, (state, action) => {
      const { firstName, lastName } = action.payload
      state.firstName = firstName
      state.lastName = lastName
    })
    builder.addMatcher(isAnyOf(logoutUser.fulfilled, actualiseUserSession.rejected), (state, action) => {
      return initialState
    })
    builder.addMatcher(isAnyOf(authenticateUser.fulfilled, actualiseUserSession.fulfilled), (state, action) => {
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


