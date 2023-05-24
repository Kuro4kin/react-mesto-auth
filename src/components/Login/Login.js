import { useState } from "react";

function Login(props) {
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

    props.onLogin(formValue);
  };

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
    </>
  );
}

export default Login;
