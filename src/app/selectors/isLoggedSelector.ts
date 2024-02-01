import { RootState } from "../store";

export const selectUserLoginStatus = (state: RootState) => {
  return state.user.isLogged
}