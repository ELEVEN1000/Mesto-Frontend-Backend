import React, {useEffect, useState} from "react";
import './Header.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Main from "./Main.jsx";
// import PopupWithForm from "./PopupWithForm.jsx";
import Api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { checkToken, authorize, register } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [popupProfileOpen, setProfilePopupOpen] = useState(false);
  const [popupAvatarOpen, setAvatarPopupOpen] = useState(false);
  const [popupCardOpen, setCardPopupOpen] = useState(false);
  // const [popupAnswerOpen, setAnswerPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState({
    status: "",
    message: "",
  });
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleRegister = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    register(password, email)
      .then(() => {
        setFormValue({ email: "", password: "" });
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      });
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    authorize(password, email)
      .then((data) => {
        setFormValue({ email: "", password: "" });
        setLoggedIn(true);
        Api.setToken(data.jwtToken);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then(() => {
          Api.setToken(jwt);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Функция добавления/удаления лайков ---------------------------------------------------------
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    Api.addLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => {
        console.log(err);
      })
  }

  // Функция удаления карточки ------------------------------------------------------------------
  function handleCardDelete(card) {
    Api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функция обновления информации пользователя ---------------------------------------------------
  function handleUpdateUser(items) {
    Api
      .changeProfile(items)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Функция обновления аватарки ------------------------------------------------------------------
  function handleUpdateAvatar(items) {
    Api
      .changeAvatar(items)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Функция добавления карточки на страницу -------------------------------------------------------
  function handleAddPlaceSubmit(items) {
    Api
      .postCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getUser(), Api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);


  const closeAllPopups = () => {
    setProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setCardPopupOpen(false);
    // setAnswerPopupOpen(false);
    setSelectedCard({});
    setIsOpenInfoTooltip(false);
  };


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onEditAvatar = () => {
    setAvatarPopupOpen(true);
  };

  const onEditProfile = () => {
    setProfilePopupOpen(true);
  };

  const onAddPlace = () => {
    setCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={onEditAvatar}
              onEditProfile={onEditProfile}
              onAddPlace={onAddPlace}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
            />}
            />
          <Route
            path="/sign-in"
            element={
            <Login
              onLogin={handleLogin}
              handleChange={handleChange}
              formValue={formValue}
              title="Вход"
              buttonText="Войти"
            />}

          />
          <Route
            path="/sign-up"
            element={
            <Register
              handleChange={handleChange}
              onRegister={handleRegister}
              formValue={formValue}
              title={"Регистрация"}
              buttonText={"Зарегистрироваться"}
            />
            }
          />

          <Route
            path="/*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

        </Routes>

        {loggedIn && <Footer />}

        <InfoTooltip
          isRegister={isRegister}
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          alt={"Статус"}
        />

        <EditProfilePopup
          isOpen={popupProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup
          isOpen={popupCardOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}/>

        <EditAvatarPopup
          isOpen={popupAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}/>

        {/*<PopupWithForm title="Вы уверены?" name="popupUpdateAvatar" isOpen={popupAnswerOpen} closeAllPopups={closeAllPopups} form="form_confirm">*/}
        {/*    <button className="popup__save-button popup__confirm-button" type="submit" aria-label="save">Да</button>*/}
        {/*</PopupWithForm>*/}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}
export default App;
