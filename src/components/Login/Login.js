import React from "react";
import Header from "../Header/Header";
import auth from "../../utils/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Login = ({setLoggedIn}) => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    auth.signin(password, email).then((res) => {
      auth.tokenValidity(res.token)
      setLoggedIn(true)
      history.push('./')
    })
  }

  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form__title">Авторизация</h1>
      <div className="form__container_input">
      <input
          className="form__input form__input_signIn-email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={({target: {value}}) => setEmail(value)}
        />
        <input
          className="form__input form__input_signIn-password"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={({target: {value}}) => setPassword(value)}
        />
      </div>
      <button className="form__submit-button">Войти</button>
    </form>
    </>
  );
};

export default Login;
