import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "../common/PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AppApi from '../utils/api'
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
const EditAvatar = React.lazy(() => import('profile/EditAvatar'));
const EditProfile = React.lazy(() => import('profile/EditProfile'));
const ViewProfile = React.lazy(() => import('profile/ViewProfile'));
const AddPhoto = React.lazy(() => import('photo/AddPhoto'));
const Login = React.lazy(() => import('auth/Login'));
const Register = React.lazy(() => import('auth/Register'));

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    new AppApi()
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(newUserData) {
        setCurrentUser(newUserData);
        closeAllPopups();
  }

  function handleUpdateAvatar(newUserData) {
        setCurrentUser(newUserData);
        closeAllPopups();
  }

  function handleCardLike(card) {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
  }

  function handleCardDelete(card) {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
  }

  function handleAddPlace(newCardFull) {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
  }

  function onRegister() {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
  }
  function onRegisterError() {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
  }

  function onLogin(email ) {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
  }

  function onLoginError() {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register onSuccess={onRegister} onError={onRegisterError} />
          </Route>
          <Route path="/signin">
            <Login onSuccess={onLogin} onError={onLoginError} />
          </Route>
        </Switch>
        <Footer />
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPhoto
          isOpen={isAddPlacePopupOpen}
          onSuccess={handleAddPlace}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onSuccess={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
