function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpened ? "popup_is-opened" : ""
      }`}>
      <div className="popup__wrapper-image">
        <button
          aria-label="Close"
          type="button"
          className="popup__close-button" onClick={props.onClose}></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={`Фотография из места ${props.card.name}`}
        />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
