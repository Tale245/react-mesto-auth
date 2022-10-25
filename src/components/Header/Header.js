import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
const Header = ({ logo, userData, signout }) => {
  return (
    <header className="header">
      <a href="index.html" className="header__link">
        <img src={logo} alt="логотип проекта Место" className="header__logo" />
      </a>      
      <Route exact path='/'>
      <div className="header__wrapper">
        <p className="header__paragraph">{userData.data && userData.data.email}</p>
        <button className="header__logout" onClick={signout}>Выйти</button>
      </div>
      </Route>
      <Route path='/signin'>
      <Link className="header__paragraph" to='/signup'>Регистрация</Link>
      </Route>
      <Route path='/signup'>
      <Link className="header__paragraph" to='/signin'>Войти</Link>
      </Route>
    </header>
  );
};
export default Header;
