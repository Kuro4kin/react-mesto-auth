function InfoTooltip(props) {
  return (
    <div className={`infotooltip ${props.isOpen ? "infotooltip_active" : ""}`}>
      <div className="infotooltip__container">
        <button className="infotooltip__close-button" onClick={props.onClose}></button>
        <img 
          className="infotooltip__icon" 
          src={props.icon}
          alt="Иконка результата авторизации" 
        />
        <p className="infotooltip__description">{props.description}</p>
      </div>
    </div>
  )
}

export default InfoTooltip