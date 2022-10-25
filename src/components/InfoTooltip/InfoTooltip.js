import React from "react"
import success from "../../images/success.svg";
import fail from "../../images/fail.svg";
const InfoTooltip = ({ onClose, isOpen, isRegister }) => {
    return(

        <div className={`popup popup_infoTooltip ${isOpen && 'popup_opened'}`}>
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <button className="popup__close-button" onClick={onClose}></button>
            <img src={isRegister ? `${success}` : `${fail}`} alt={isRegister ? `${'Вы успешно зарегистрировались'}` : `${'Что-то пошло не так! Попробуйте еще раз.'}`} className="popup__icon" />
            <p className="popup__title popup__text">{isRegister ? `${'Вы успешно зарегистрировались'}` : `${'Что-то пошло не так! Попробуйте еще раз.'}`}</p>
      </div>
      </div>
    )
}

export default InfoTooltip