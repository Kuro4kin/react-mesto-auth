import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup/ConfirmDeletePopup.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import Register from "./Register/Register.js";
import Login from "./Login/Login.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute.js";
import { register } from "../utils/auth.js";
import { login } from "../utils/auth.js";
import { checkToken } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";
import loginOkIcon from "../images/infotooltip-icon-ok.svg";
import loginErrorIcon from "../images/infotooltip-icon-err.svg";
import PageNotFound from "./PageNotFound/PageNotFound.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistredUser, setIsRegistredUser] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
        .then(([userInfo, cardsInfo]) => {
          setCurrentUser(userInfo);

          const results = cardsInfo.map((item) => ({
            key: item._id,
            createdAt: item.createdAt,
            likes: item.likes,
            link: item.link,
            name: item.name,
            owner: {
              name: item.owner.name,
              about: item.owner.about,
              avatar: item.owner.avatar,
              _id: item.owner._id,
              cohort: item.owner.cohort,
            },
            _id: item._id,
          }));
          setCards(results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card });
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleDeleteIconClick(card) {
    setSelectedCard({ ...card });
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }

  function closeInfoTooltip() {
    if (isRegistredUser) {
      navigate("/sign-in", { replace: true });
      setIsRegistredUser(false);
    }
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .editUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .removeThisCard(card)
      .then(() => {
        setCards(
          cards.filter((c) => {
            return c._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    setIsLoading(true);
    api
      .editUserAvatar(avatarInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);
    api
      .createNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(formValue) {
    login(formValue)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUserEmail(formValue.email)
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(formValue) {
    register(formValue)
      .then((res) => {
        console.log(res);
        setIsRegistredUser(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistredUser(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleClickSignOutLink() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page-wrapper">
          <Header loggedIn={loggedIn} userMail={userEmail} handleClickSignOutLink={handleClickSignOutLink} />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin}/>}
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={(props) => (
                    <>
                      <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onDeleteIconClick={handleDeleteIconClick}
                        onCardDelete={handleCardDelete}
                      />
                      <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                      />
                      <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                      />
                      <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                      />
                      <ConfirmDeletePopup
                        name="confirm"
                        title="Вы уверены?"
                        isOpen={isConfirmDeletePopupOpen}
                        onClose={closeAllPopups}
                        card={selectedCard}
                        onClick={handleCardDelete}
                        isLoading={isLoading}
                      />
                      <ImagePopup
                        name="image-view"
                        isOpened={isImagePopupOpen}
                        card={selectedCard}
                        onClose={closeAllPopups}
                      />
                    </>
                  )}
                />
              }
            />
            <Route path="*" element={<PageNotFound icon={loginErrorIcon}/>}/>
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTooltip}
            icon={isRegistredUser ? loginOkIcon : loginErrorIcon}
            description={
              isRegistredUser ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
            }
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
