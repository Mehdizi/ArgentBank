import React from "react";
import "./Header.scss";
import logo from "../../../assets/logo/argentBankLogo.png";
import { Log } from "./Log";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to={"/"}>
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Log />
        </div>
      </nav>
    </header>
  );
};
