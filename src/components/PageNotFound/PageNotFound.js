import { Link } from "react-router-dom";

function PageNotFound(props) {
  return (
    <div className="page404">
      <img className="page404__icon" src={props.icon} alt="Иконка ошибки" />
      <p className="page404__message">Такая страница пока не создана.</p>
      <Link className="page404__link" to="/sign-in">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
