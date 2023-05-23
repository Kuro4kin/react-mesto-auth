import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {

  const [titleCard, setTitleCard] = useState("")
  const [linkImage, setLinkImage] = useState("")

    useEffect(() => {
    setTitleCard("");
    setLinkImage("");
  }, [props.isOpen])
  
  function handleInputTitleChange(event) {
    setTitleCard(event.target.value);
  } 

  function handleInpuLinkChange(event) {
    setLinkImage(event.target.value);
  }

  function handleAddPlaceSubmit(event) {
    event.preventDefault()

    props.onAddPlace({
      title: titleCard,
      link: linkImage,
    })
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={props.isLoading ? "Создание..." : "Создать"}
      onSubmit={handleAddPlaceSubmit}
      onClose={props.onClose}
      isOpened={props.isOpen}
      children={
        <>
          <input
            name="title"
            type="text"
            minLength="2"
            maxLength="30"
            value={titleCard}
            onChange={handleInputTitleChange}
            required
            className="popup__input popup__input_type_card-title"
            placeholder="Название"
          />
          <span className="popup__error title-error"></span>
          <input
            name="link"
            type="url"
            required
            value={linkImage}
            onChange={handleInpuLinkChange}
            className="popup__input popup__input_type_card-img-link"
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error link-error"></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;