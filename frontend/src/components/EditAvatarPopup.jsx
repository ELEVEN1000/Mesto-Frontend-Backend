import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  return (
    <div>
      <PopupWithForm
          title="Обновить аватар"
          name="popupUpdateAvatar"
          isOpen={props.isOpen}
          closeAllPopups={props.onClose}
          textButton="Сохранить"
          form="form_avatar"
          onSubmit={handleSubmit}>

        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_link_add"
          id="input-link-update"
          name="avatar"
          ref={ref}
          required/>

        <span className="input-link-update-error popup__error"></span>

      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;
