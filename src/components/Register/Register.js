import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";




function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onRegister(formValue);
  };

  return (
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
  );
}

export default Register;
