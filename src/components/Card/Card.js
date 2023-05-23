import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteIconClick }) {
  
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${isLiked && "card__button-like_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteIconClick() {
    onDeleteIconClick(card)
  }

  return (
    <li className="card">
      {isOwn && <button type="button" className="card__button-delete" onClick={handleDeleteIconClick} />}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__item">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-area">
          <button className={cardLikeButtonClassName} onClick={handleLike}></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
