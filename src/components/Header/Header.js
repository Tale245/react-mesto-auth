import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
const Header = ({ logo }) => {
  return (
    <header className="header">
      <a href="index.html" className="header__link">
        <img src={logo} alt="логотип проекта Место" className="header__logo" />
      </a>
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