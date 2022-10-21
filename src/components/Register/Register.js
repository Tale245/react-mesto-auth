import React from "react";
import fail from "../../images/fail.svg";
import success from "../../images/success.svg";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
const Register = ({ onClose, isOpen }) => {
  return (
    <>
      <form className="form">
        <h1 className="form__title">Регистрация</h1>
        <div className="form__container_input">
          <input
            className="form__input form__input_signUp-email"
            placeholder="Email"
            type="email"
          />
          <input
            className="form__input form__input_signUp-password"
            placeholder="Пароль"
            type="password"
          />
        </div>
        <button className="form__submit-button">Зарегистрироваться</button>
        <Link className="form__paragraph" to="/signin">
          <p>Уже зарегистрированы? Войти</p>
        </Link>
      </form>

      <InfoTooltip onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Register;
