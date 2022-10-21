import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      avatarRef
    );
  }
  return (
    <PopupWithForm
      popupName="change-avatar"
      title="Изменить аватар"
      submitBtnName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_change-avatar"
        type="url"
        id="avatarLink"
        placeholder="Ссылка на аватар"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span
        className="avatarLink-error popup__field-error span-error"
        id="avatarLink-error"
      ></span>
    </PopupWithForm>
  );
};
