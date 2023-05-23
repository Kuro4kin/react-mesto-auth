import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import loginErrorIcon from "../../images/infotooltip-icon-err.svg";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formValue)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          props.handleLogin(true);
          props.handleChangeUserMail(formValue.email);
          navigate("/", { replace: true });
        } else {
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <>
      <div className="page-logout">
        <h5 className="page-logout__title">Вход</h5>
        <form className="page-logout__form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            minLength="2"
            maxLength="40"
            required
            className="page-logout__input"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            minLength="2"
            maxLength="10"
            required
            className="page-logout__input"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <button className="page-logout__button">Войти</button>
        </form>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoTooltip}
        icon={loginErrorIcon}
        description={"Такой пользователь не найден. Проверьте правильность заполнения."}
      />
    </>
  );
}

export default Login;
