import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoginStatus } from "../../../app/selectors/isLoggedSelector";
import { ThunkAppDispatch } from "../../../app/store";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../../app/selectors/nameSelector";
import { logoutUser } from "../../../app/features/logoutUser/logoutUser";

export const Log = () => {
  const dispatch = useDispatch<ThunkAppDispatch>();
  const { firstName } = useSelector(selectUser);
  const isLogged = useSelector(selectUserLoginStatus);
  const logout = () => {
    dispatch(logoutUser());
  };

  if (!isLogged)
    return (
      <NavLink className="main-nav-item" to="/login">
        <i className="fa fa-user-circle"></i>
        Sign In
      </NavLink>
    );

  return (
    <div className="main-nav-wrapper">
      <NavLink className="main-nav-item" to="/profile">
        <i className="fa fa-user-circle"></i>
        {firstName}
      </NavLink>
      <button className="main-nav-item" onClick={logout}>
        <i className="fa fa-sign-out-alt"></i>Sign Out
      </button>
    </div>
  );
};
