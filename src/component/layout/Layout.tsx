import React, { PropsWithChildren, useEffect } from "react";
import "./Layout.scss";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { ThunkAppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { actualiseUserSession } from "../../app/features/actualiseUserSession/actualiseUserSession";
import { selectUserLoginStatus } from "../../app/selectors/isLoggedSelector";

export const Layout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<ThunkAppDispatch>();
  const isLogged = useSelector(selectUserLoginStatus);
  useEffect(() => {
    const _actualiseUserSession = async () => {
      if (isLogged) {
        await dispatch(actualiseUserSession());
      }
    };
    _actualiseUserSession();
  }, [isLogged, dispatch]);
  return (
    <div className="layout-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
