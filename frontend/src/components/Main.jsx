import React, {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__overlay" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar"/>
        </div>

        <div className="profile__info">
          <div className="profile__items">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button className="profile__button-edit" name="edit" type="button" aria-label="edit" onClick={onEditProfile}></button>
        </div>

        <button className="profile__button-add" name="add" type="button" aria-label="Добавить место" onClick={onAddPlace}></button>

      </section>

      <section className="elements">{cards.map((card) => (
        <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
      ))}
      </section>
    </main>
  )
}

export default Main;
