import React from "react";
// import { CurrentCardContext } from "../../contexts/CurrentCardContext"
const Card = ({
  link,
  name,
  likes,
  onCardClick,
  card,
  currentUser,
  onCardLike,
  onCardDelete
}) => {
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${isLiked && "element__button_active"}`;

  // const currentCard = React.useContext(CurrentCardContext)

  function handleClick() {
    onCardClick({ link: link, name: name });
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick(){
    onCardDelete(card)
  }

  return (
    <div className="element">
      <img
        src={`${link}`}
        className="element__img"
        alt={`${name}`}
        onClick={handleClick}
      />
      <div className="element__item">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button
            className={`element__button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          ></button>
          <p className={`element__like`}>{likes.length}</p>
        </div>
        <button
          className={`element__trash-button ${cardDeleteButtonClassName}`}
          onClick={handleDeleteClick}
        ></button>
      </div>
    </div>
  );
};
export default Card;
