import React, { FormEvent, useEffect, useState } from "react";
import "./Login.scss";
import { Layout } from "../../component/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../app/features/authenticateUser/authenticateUser";
import { ThunkAppDispatch } from "../../app/store";
import { selectUserLoginStatus } from "../../app/selectors/isLoggedSelector";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch<ThunkAppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogged = useSelector(selectUserLoginStatus);
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(authenticateUser({ email: email, password: password }));
  };

  useEffect(() => {
    if (isLogged) navigate("/profile");
  }, [isLogged, navigate]);

  return (
    <Layout>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                required
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
};
