import React from "react";
import ok from "../images/ok-auth.svg";
import error from "../images/decline-auth.svg";
import usePopupClose from "../hooks/usePopupClose";

const InfoTooltip = ({isOpen, onClose, isRegister, alt }) => {
  usePopupClose(isOpen, onClose);

  return (

    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__auth-res">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        />
        <img
          className="popup__auth-image"
          src={isRegister.status ? ok : error}
          alt={alt}
        />
        <h2 className="popup__title popup__title_auth">
          {isRegister.message}
        </h2>
      </div>
    </div>

  );
};

export default InfoTooltip;
