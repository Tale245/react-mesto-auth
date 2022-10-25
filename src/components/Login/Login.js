import React from "react";


const Login = ({setLoggedIn,  handleSumbitSignin}) => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSumbitSignin(password, email)
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
