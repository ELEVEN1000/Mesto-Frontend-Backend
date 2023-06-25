function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_zoom ${Object.keys(card).length !== 0 ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <img src={card.link} alt={card.name} className="popup__zoom-image"/>
        <button className="popup__close-button popup__close-zoom" aria-label="close" onClick={onClose}></button>
        <p className="popup__zoom-title">{`${card.name}`}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
