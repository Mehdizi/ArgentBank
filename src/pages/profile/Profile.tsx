import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Layout } from "../../component/layout/Layout";
import { useSelector } from "react-redux";
import { EditNameForm } from "../../component/editNameForm/EditNameForm";
import { selectUser } from "../../app/selectors/nameSelector";
import { selectUserLoginStatus } from "../../app/selectors/isLoggedSelector";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { firstName, lastName } = useSelector(selectUser);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const isLogged = useSelector(selectUserLoginStatus);
  const navigate = useNavigate();
  const toggleForm = () => setIsFormOpened((state) => !state);
  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <Layout>
      <main className="main bg-dark">
        <header className="header-profile">
          <h1>Welcome back</h1>
          {!isFormOpened && (
            <div className="edit-button-wrapper">
              <p>
                {firstName} {lastName}
              </p>
              <button className="edit-button" onClick={() => toggleForm()}>
                Edit Name
              </button>
            </div>
          )}
        </header>

        {isFormOpened && (
          <EditNameForm
            toggleForm={toggleForm}
            firstName={firstName}
            lastName={lastName}
          />
        )}

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </Layout>
  );
};
