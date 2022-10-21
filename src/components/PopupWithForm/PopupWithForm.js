const PopupWithForm = ({popupName, title, submitBtnName, isOpen, onClose, children, onSubmit}) => {
  
  return (
    <div className={`popup popup_${popupName} ${ isOpen && 'popup_opened'}`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className={`popup__container popup__container_${popupName}`}>
        <button className="popup__close-button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_${popupName}`} onSubmit={onSubmit}>
            {children}
          <button className={`popup__submit-button popup__submit-button_${popupName}`}>
            <span className="popup__text-button">{submitBtnName}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
