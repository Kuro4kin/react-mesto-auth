import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name ? currentUser.name : "");
    setDescription(currentUser.about ? currentUser.about : "");
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            name="name"
            type="text"
            minLength="2"
            maxLength="40"
            value={name}
            required
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            onChange={handleNameChange}
          />
          <span className="popup__error name-error"></span>
          <input
            name="about"
            type="text"
            minLength="2"
            maxLength="200"
            value={description}
            required
            className="popup__input popup__input_type_about"
            placeholder="О себе"
            onChange={handleDescriptionChange}
          />
          <span className="popup__error about-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
