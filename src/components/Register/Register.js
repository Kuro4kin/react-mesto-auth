import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/auth.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import loginOkIcon from "../../images/infotooltip-icon-ok.svg";
import loginErrorIcon from "../../images/infotooltip-icon-err.svg";

function Register() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isRegistredUser, setIsRegistredUser] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formValue)
      .then((res) => {
        if (res) {
          setIsRegistredUser(true);
          setIsInfoTooltipOpen(true);
          navigate("/sign-in", { replace: true });
        } else {
          setIsRegistredUser(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page-logout">
        <h5 className="page-logout__title">Регистрация</h5>
        <form className="page-logout__form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            minLength="2"
            maxLength="40"
            required
            className="page-logout__input"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            minLength="2"
            maxLength="200"
            required
            className="page-logout__input"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <button className="page-logout__button">Зарегистрироваться</button>
          <p className="page-logout__description">
            Уже зарегистрированы?{" "}
            <Link className="page-logout__link" to="/sign-in">
              Войти
            </Link>{" "}
          </p>
        </form>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoTooltip}
        icon={isRegistredUser ? loginOkIcon : loginErrorIcon}
        description={isRegistredUser ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
      />
    </>
  );
}

export default Register;
