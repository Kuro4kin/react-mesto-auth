function ConfirmDeletePopup(props) {
  
  function handleConfirmDelete() {
    props.onClick(props.card);
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
    <div className={`popup__container popup__container_type_${props.name}`}>
      <button aria-label="Close" type="button" className="popup__close-button" onClick={props.onClose}></button>
      <h2 className="popup__title">{props.title}</h2>
      <div onClick={handleConfirmDelete} name={props.name} method="get" action="#" className="popup__form">
        {props.children}
        <button type="button" className="popup__button">
          {props.isLoading ? "Удаление..." : "Да"}
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmDeletePopup