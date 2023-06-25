import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    })
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
        title="Новое место"
        name="popupAddCard"
        isOpen={props.isOpen}
        closeAllPopups={props.onClose}
        textButton="Создать"
        form="form_card"
        onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Название"
        className="popup__input popup__input_name_add"
        id="input-name-add"
        name="name"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}/>

      <span className="input-name-add-error popup__error"></span>

      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_link_add"
        id="input-link-add"
        name="link"
        value={link}
        onChange={handleChangeLink}/>

      <span className="input-link-add-error popup__error"></span>

    </PopupWithForm>
  );
}

export default AddPlacePopup;
