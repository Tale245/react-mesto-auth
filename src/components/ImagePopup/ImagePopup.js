const ImagePopup = ({card,  onClose}) => {
    return(
        <div className={`popup popup_image-scale ${card.card && 'popup_opened'}`}>
        <div className="popup__overlay popup__overlay-img" onClick={onClose}></div>
        <div className="popup__container popup__container_image">
          <button className="popup__close-button popup__close-button-image" onClick={onClose}></button>
          <section className="popup__content">
            <img src={`${card.link}`} alt={`${card.name}`} className="popup__image" />
            <p className="popup__paragraph">{card.name}</p>
          </section>
        </div>
      </div>
    )
}

export default ImagePopup