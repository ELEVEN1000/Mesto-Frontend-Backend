import React from "react";
import Logo from "../images/Logo.svg"
import {Routes, Route, Link} from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={Logo} alt="Логотип" className="header__logo"/>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__user-info">
              <p className="header__user-email">{email}</p>
              <button className="header__button-logout" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  )
}

export default Header;
