import React from "react";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content section-content">
      <section className="profile section-profile">
        <button aria-label="Add" type="button" className="profile__button-edit-image" onClick={props.onEditAvatar}>
          <img className="profile__image" src={currentUser.avatar} alt="Ваша фотография" />
        </button>
        <div className="profile__information">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            aria-label="Add"
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}></button>
        </div>
        <button aria-label="Add" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="section-elements">
        <ul className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onDeleteIconClick={props.onDeleteIconClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
