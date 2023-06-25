import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useState, useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
        title="Редактировать профиль"
        name="popupProfile"
        isOpen={props.isOpen}
        closeAllPopups={props.onClose}
        textButton="Сохранить"
        form="form_profile"
        onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_name"
        id="input-name"
        name="name"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
        required/>

      <span className="input-name-error popup__error"></span>

      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_job"
        id="input-job"
        name="about"
        minLength="2"
        maxLength="200"
        onChange={handleChangeAbout}
        value={description || ""}/>

      <span className="input-job-error popup__error"></span>

    </PopupWithForm>
  );
}

export default EditProfilePopup;
