import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.name, currentUser.about, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      popupName="edit-info"
      title="Редактировать профиль"
      submitBtnName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__field popup__field_name"
        id="name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <span
        className="name-error popup__field-error span-error"
        id="name-error"
      ></span>
      <input
        type="text"
        names="job"
        className="popup__field popup__field_job"
        id="about"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <span
        className="job-error popup__field-error span-error"
        id="job-error"
      ></span>
    </PopupWithForm>
  );
};
