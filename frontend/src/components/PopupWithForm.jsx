import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm ({title, name, isOpen, closeAllPopups, children, textButton, form, onSubmit}) {

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={closeAllPopups} aria-label="Закрыть"></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__${form}`} name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{textButton || ""}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
