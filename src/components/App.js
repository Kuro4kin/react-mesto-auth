import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { checkToken } from "../utils/auth.js"

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  React.useEffect(() => {
    Promise.all([api.getInitialUserInfo(), api.getInitialCards()]).then(([userInfo, cardsInfo]) => {
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
    });
  }, []);

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

  function handleChangeUserMail(mail) {
    setUserEmail(mail)
  }

  function handleClickSignOutLink() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page-wrapper">
        <Header 
          loggedIn={loggedIn} 
          userMail={userEmail}
          handleClickSignOutLink={handleClickSignOutLink}
        />
          <Routes>
            <Route path="/sign-up" element={<Register />}
            />
            <Route path="/sign-in" element={
              <Login 
                handleLogin={setLoggedIn}
                handleChangeUserMail={handleChangeUserMail} 
              />} 
            />
            <Route path="/" element={<ProtectedRouteElement loggedIn={loggedIn} element={(props)=> (
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
              )}/>}
            />
            <Route path="*" element={
            <div>Ошибка 404. Такой страницы не существует</div>}/>
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
