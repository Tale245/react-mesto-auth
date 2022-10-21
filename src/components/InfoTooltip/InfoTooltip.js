import React from "react"
import fail from "../../images/fail.svg";
import success from "../../images/success.svg";

const InfoTooltip = ({ onClose, isOpen }) => {
    return(

        <div className={`popup popup_infoTooltip ${isOpen && 'popup_opened'}`}>
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <button className="popup__close-button" onClick={onClose}></button>
            <img src={`${success}`} alt={`Успех в регистрации`} className="popup__icon" />
            <p className="popup__title popup__text">Вы успешно зарегистрировались!</p>
      </div>
      </div>
    )
}

export default InfoTooltip