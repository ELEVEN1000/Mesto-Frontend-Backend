import React from "react";

const Login = ({ title, formValue, handleChange, onLogin, buttonText }) => {
  return (
    <div className="authorization">
      <h1>{title}</h1>
      <form className="authorization-form" onSubmit={onLogin}>
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
      </form>
    </div>
  );
};

export default Login;
