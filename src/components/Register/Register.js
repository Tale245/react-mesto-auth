import React from "react";
// import fail from "../../images/fail.svg";
// import success from "../../images/success.svg";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Link } from "react-router-dom";

const Register = ({ onClose, isOpen, handleSubmitSignup, isRegister }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitSignup(password, email)
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Регистрация</h1>
        <div className="form__container_input">
          <input
            className="form__input form__input_signUp-email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <input
            className="form__input form__input_signUp-password"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <button className="form__submit-button">Зарегистрироваться</button>
        <Link className="form__paragraph" to="/signin">
          <p>Уже зарегистрированы? Войти</p>
        </Link>
      </form>

      <InfoTooltip onClose={onClose} isOpen={isOpen} isRegister={isRegister} />
    </>
  );
};

export default Register;
