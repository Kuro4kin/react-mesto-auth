import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={inputRef}
            name="avatar"
            type="url"
            required
            className="popup__input popup__input_type_card-img-link"
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error avatar-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
