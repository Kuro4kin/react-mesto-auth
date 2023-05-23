import React from "react";

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpened ? "popup_is-opened" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button aria-label="Close" type="button" className="popup__close-button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} name={props.name} method="get" action="#" className="popup__form" noValidate>
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
