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
    const isUserConnected = async () => {
      await dispatch(actualiseUserSession());
    };
    isUserConnected();
  }, []);
  return (
    <div className="layout-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
