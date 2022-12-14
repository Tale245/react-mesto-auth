import logo from "../images/header__logo.svg";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import api from "../utils/Api";
import { EditProfilePopup } from "./EditProfilePopup/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup/EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup/AddPlacePopup";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ card: false });
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  // const [userData, setUserData] = React.useState({});
  const [isRegister, setIsRegister] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const loginWithToken = (jwt) => {
    return auth
      .tokenValidity(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res)
        }
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      loginWithToken(jwt);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    const newStateItem = (cardWithChangeLikeStatus) => {
      setCards((stateCards) =>
        stateCards.map((item) =>
          item._id === card._id ? cardWithChangeLikeStatus : item
        )
      );
    };

    if (!isLiked) {
      api
        .changeLikeCard(card, "PUT")
        .then((cardWithLike) => newStateItem(cardWithLike))
        .catch((e) => console.log(e));
    } else {
      api
        .changeLikeCard(card, "DELETE")
        .then((cardWithDislike) => newStateItem(cardWithDislike))
        .catch((e) => console.log(e));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((e) => console.log(e));
  }

  function handleCardClick({ link, name }) {
    setSelectedCard({ card: true, link: link, name: name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ card: false });
  }

  function handleAddPlaceSubmit(card, nameRef, linkRef) {
    api
      .uploadCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
        nameRef.current.value = "";
        linkRef.current.value = "";
      })
      .catch((e) => console.log(e));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCloseInfoTooltip() {
    if (isRegister) {
      setisInfoTooltipOpen(false);
      history.push("/signin");
    } else setisInfoTooltipOpen(false);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((e) => console.log(e));
  }

  function handleUpdateAvatar({ avatar }, avatarRef) {
    api
      .changeAvatar({ avatar })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
        avatarRef.current.value = "";
      })
      .catch((e) => console.log(e));
  }

  function handleSubmitSignin(password, email) {
    auth
      .signin(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          loginWithToken(res.token);
          history.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
        setisInfoTooltipOpen(true);
        setIsRegister(false);
      });
  }

  function handleSubmitSignup(password, email) {
    auth
      .signup(password, email)
      .then((res) => {
        if (res) {
          setisInfoTooltipOpen(true);
          setIsRegister(true);
        } else {
          setisInfoTooltipOpen(true);
          setIsRegister(false);
        }
      })
      .catch((e) => console.log(e));
  }

  function signout() {
    localStorage.removeItem("jwt");
    history.push("/signin");
    setCurrentUser({});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={cards}>
          <Header logo={logo} currentUser={currentUser} signout={signout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/signup">
              <Register
                onClose={handleCloseInfoTooltip}
                isOpen={isInfoTooltipOpen}
                handleSubmitSignup={handleSubmitSignup}
                isRegister={isRegister}
              />
            </Route>
            <Route path="/signin">
              <Login
                setLoggedIn={setLoggedIn}
                handleSumbitSignin={handleSubmitSignin}
                onClose={handleCloseInfoTooltip}
                isOpen={isInfoTooltipOpen}
                isRegister={isRegister}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            uploadCard={handleAddPlaceSubmit}
          />

          <PopupWithForm
            popupName="confirm"
            title="???? ???????????????"
            submitBtnName="????"
            isOpen={false}
            onClose={closeAllPopups}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
