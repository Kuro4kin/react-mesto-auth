import { Routes, Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header(props) {
  return (
    <header className="header section-header">
      <img src={logo} className="header__logo" alt="Логотип место" />
      <ul className="header__navbar">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <li>
                <Link className="header__link" to="/sign-in">
                  Войти
                </Link>
              </li>
            }
          />
          <Route
            path="/sign-in"
            element={
              <li>
                <Link className="header__link" to="/sign-up">
                  Регистрация
                </Link>
              </li>
            }
          />
          <Route
            path="/"
            element={
              <>
                <li className="header__subtitle">{props.userMail}</li>
                <li onClick={props.handleClickSignOutLink}>
                  <Link className="header__link header__link_type_logout" to="/sign-in">
                    Выйти
                  </Link>
                </li>
              </>
            }
          />
        </Routes>
      </ul>
    </header>
  );
}

export default Header;
