import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
export const AddPlacePopup = ({ isOpen, onClose, uploadCard }) => {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    uploadCard(
      {
        name: nameRef.current.value,
        link: linkRef.current.value,
      },
      nameRef,
      linkRef
    );
  };

  return (
    <PopupWithForm
      popupName="add-item"
      title="Новое место"
      submitBtnName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__field popup__field_title-image"
        id="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={nameRef}
        required
      />
      <span className="title-error popup__field-error"></span>
      <input
        type="url"
        name="link"
        className="popup__field popup__field_image"
        id="url"
        placeholder="Ссылка на картинку"
        ref={linkRef}
        required
      />
      <span className="url-error popup__field-error" id="url-error"></span>
    </PopupWithForm>
  );
};
