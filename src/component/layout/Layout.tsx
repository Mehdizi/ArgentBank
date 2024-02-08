import React, { PropsWithChildren, useEffect } from "react";
import "./Layout.scss";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { ThunkAppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { actualiseUserSession } from "../../app/features/actualiseUserSession/actualiseUserSession";

export const Layout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<ThunkAppDispatch>();
  useEffect(() => {
    const _actualiseUserSession = async () => {
      await dispatch(actualiseUserSession());
    };
    _actualiseUserSession();
  }, []);
  return (
    <div className="layout-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
