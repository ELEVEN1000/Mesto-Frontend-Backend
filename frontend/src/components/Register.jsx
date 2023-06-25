import React from "react";
import {Link} from "react-router-dom";

const Register = ({ title, onRegister, handleChange, formValue, buttonText }) => {
  return (
    <div className="authorization">
      <h1>{title}</h1>
      <form className="authorization-form" onSubmit={onRegister}>
        <input
          className="authorization-form__input"
          name="email"
          placeholder="E-mail"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          required
        ></input>
        <input
          name="password"
          className="authorization-form__input"
          placeholder="Пароль"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>
        <button
          className="authorization-form__button"
          type="submit"
          name="save"
        >
          {buttonText}
        </button>
        <Link className="authorization__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
