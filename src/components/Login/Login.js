import React from "react";
import Header from "../Header/Header";
const Login = () => {
  return (
    <>
    <form className="form">
      <h1 className="form__title">Авторизация</h1>
      <div className="form__container_input">
      <input
          className="form__input form__input_signIn-email"
          placeholder="Email"
          type="email"
        />
        <input
          className="form__input form__input_signIn-password"
          placeholder="Пароль"
          type="password"
        />
      </div>
      <button className="form__submit-button">Войти</button>
    </form>
    </>
  );
};

export default Login;
