import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header(props) {

  const location = useLocation();

  return (
    <header className="header section-header">
      <img src={logo} className="header__logo" alt="Логотип место" />
      <ul className="header__navbar">
        {location.pathname === "/sign-up" && <li><Link className="header__link" to="/sign-in">Войти</Link></li>}
        {location.pathname === "/sign-in" && <li><Link className="header__link" to="/sign-up">Регистрация</Link></li>}
        {props.loggedIn && <li className="header__subtitle">{props.userMail}</li>}
        {props.loggedIn && <li onClick={props.handleClickSignOutLink}><Link className="header__link header__link_type_logout" to="/sign-in">Выйти</Link></li>}
      </ul>
    </header>
  )
}

export default Header