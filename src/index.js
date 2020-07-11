'use strict';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./style.css";
import FormValidator from "@/assets/FormValidator";
import Api from "@/assets/Api";
import UserInfo from "@/assets/UserInfo";
import ChangeAvatarPopup from "@/assets/ChangeAvatarPopup";
import CardList from "@/assets/CardList";
import Card from "@/assets/Card";
import ImagePopup from "@/assets/ImagePopup";
import AddCardPopup from "@/assets/AddCardPopup";
import EditFormPopup from "@/assets/EditFormPopup";

(function () {
//imports

    /* Переменные */
    const cardContainer = document.querySelector('.places-list');
    const formEditUserInfoData = document.forms.edit_data;
    const form = document.forms.new;
    const formChangeAvatar = document.forms.edit_avatar;
    const template = document.querySelector('#task-template').content;
    /*    переменные для userInfo*/
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const userInfoPhoto = document.querySelector('.user-info__photo');

    /** //ошибки*/
    const errorNameForm = document.querySelector("#nameForm-error");
    const errorLinkForm = document.querySelector("#linkForm-error");
    const errorNameEdit = document.querySelector("#nameEdit-error");
    const errorJobEdit = document.querySelector("#jobEdit-error");
    const errorAvatarEdit = document.querySelector("#linkAvatar-error");

    /*переменные для слушателей*/
    const root = document.querySelector('.root');
    const popupPictureClose = document.querySelector('.popup__close_type_picture');
    const popupWindowEditContainer = document.querySelector('.popup_type_profile');
    const popupEditClose = document.querySelector('.popup__close_type_edit');
    const plusButton = document.querySelector('.user-info__button');
    const popupWindowContainer = document.querySelector('.popup_type_add-card');
    const popupWindowPictureContainer = document.querySelector('.popup_type_picture');
    const popupWindowPicture = document.querySelector('.popup__picture');
    const popupClose = document.querySelector('.popup__close_type_add-card');
    const addButton = document.querySelector('.popup__button_type_add-card');
    const saveButton = document.querySelector('.popup__button_type_edit');
    const editButton = document.querySelector('.user-info__edit-button');
    const avatarContainer = document.querySelector('.user-info__photo');
    const popupAvatarChangeContainer = document.querySelector('.popup_type_avatar');
    const popupAvatarClose = document.querySelector('.popup__close_type_avatar');
    const saveAvatarButton = document.querySelector('.popup__button_type_avatar');
    const inputAvatarPopup = document.querySelector('#linkAvatar');
    const nameEdit = document.querySelector('#nameEdit');
    const jobEdit = document.querySelector('#jobEdit');
    const nameForm = document.querySelector('#nameForm');
    const picture404 = require('./images/404.jpg');

    /**API const*/

const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

const apiData = {
  baseUrl: `${API_URL}/cohort11`,
};

    const config = {
        url: apiData.baseUrl,
        headers: {
            authorization: 'e12f1602-2248-40d3-b961-19aa86fb3b4d',
            'Content-Type': 'application/json'
        }
    };

    //============================================================
    /*функции*/
    function createCard(...arg) {
        return new Card(...arg);
    }

    /*+
     Надо исправить:
     - Класс CardList должен создаваться один раз за всю работу приложения.
     Его методы должны быть переданы туда, где они необходимы (Например, в FormPlusPopup)
    */

    function addCardList(name, link, likes, idName, idOwner, hasLike) {
        cardList.addCard(name, link, likes, idName, idOwner, hasLike, idOwner)
    }

    function modifyUserInfo(checkedName, checkedJob) {
        userInfo.setUserInfo(checkedName, checkedJob);
        userInfo.updateUserInfo()
    }

    function modifyAvatar(avatarChecked, name, about) {
        userInfo.setUserInfo(name, about, avatarChecked);
        userInfo.setAvatar()
    }

    function validateInput(event) {
        formValidator.handlerInputForm(event)
    }

    function validateSubmit(event) {
        return formValidator.checkForm(event)
    }

    function openPicturePopup(event) {
        imagePopup.open(event)
    }

    /**инициализация классов*/
    const formValidator = new FormValidator();

    const userInfo = new UserInfo({
        'userInfoName': userInfoName,
        'userInfoJob': userInfoJob,
        'userInfoPhoto': userInfoPhoto,
    });

    const api = new Api(config);

    const cardList = new CardList(
        cardContainer,
        createCard,
        api,
        template,
        openPicturePopup);

    const addCardPopup = new AddCardPopup(
        addCardList,
        validateInput,
        validateSubmit,
        form,
        createCard,
        api,
        root,
        popupWindowContainer,
        addButton,
        errorNameForm,
        errorLinkForm,
        nameForm);
    const imagePopup = new ImagePopup(popupWindowPicture, popupWindowPictureContainer, popupPictureClose, picture404);
    const editFormPopup = new EditFormPopup(
        editButton,
        popupEditClose,
        validateInput,
        validateSubmit,
        formEditUserInfoData,
        modifyUserInfo,
        api,
        userInfoName,
        userInfoJob,
        root,
        popupWindowEditContainer,
        saveButton,
        nameEdit,
        jobEdit,
        errorNameEdit,
        errorJobEdit);

    //========================================================

    /**устанавливает юзера*/
    function installUserInfo() {
        api.getUserInfo()
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about, res.avatar);
                userInfo.updateUserInfo();
                userInfo.setAvatar();
                userInfoName.setAttribute('id', res._id);
                const changeAvatarPopup = new ChangeAvatarPopup(
                    avatarContainer,
                    popupAvatarClose,
                    validateInput,
                    validateSubmit,
                    formChangeAvatar,
                    modifyAvatar,
                    api,
                    popupAvatarChangeContainer,
                    saveAvatarButton,
                    errorAvatarEdit,
                    root,
                    inputAvatarPopup);
                return changeAvatarPopup.setEventListeners();
            })
            .catch(err =>
                console.log(err))
    }

    /**первоначально рендерить карточки*/
    function installCards() {
        api.getCards()
            .then((res) => {
                const userInfoId = document.querySelector('.user-info__name').getAttribute("id");
                return cardList.render(res, userInfoId)
            })
            .catch(err =>
                console.log(err))
    }

    /** Вызовы функций */
    installUserInfo();
    installCards();

    /**установка слушателей форм*/
    addCardPopup.setEventListeners(plusButton, popupClose);
    editFormPopup.setEventListeners();
})();
/*'use strict';
(function () {

    /!* Переменные *!/
    const cardContainer = document.querySelector('.places-list');
    const formEditUserInfoData = document.forms.edit_data;
    const form = document.forms.new;
    const formChangeAvatar = document.forms.edit_avatar;
    const template = document.querySelector('#task-template').content;
    /!*    переменные для userInfo*!/
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    const userInfoPhoto = document.querySelector('.user-info__photo');

    /!** //ошибки*!/
    const errorNameForm = document.querySelector("#nameForm-error");
    const errorLinkForm = document.querySelector("#linkForm-error");
    const errorNameEdit = document.querySelector("#nameEdit-error");
    const errorJobEdit = document.querySelector("#jobEdit-error");
    const errorAvatarEdit = document.querySelector("#linkAvatar-error");

    /!*переменные для слушателей*!/
    const root = document.querySelector('.root');
    const popupPictureClose = document.querySelector('.popup__close_type_picture');
    const popupWindowEditContainer = document.querySelector('.popup_type_profile');
    const popupEditClose = document.querySelector('.popup__close_type_edit');
    const plusButton = document.querySelector('.user-info__button');
    const popupWindowContainer = document.querySelector('.popup_type_add-card');
    const popupWindowPictureContainer = document.querySelector('.popup_type_picture');
    const popupWindowPicture = document.querySelector('.popup__picture');
    const popupClose = document.querySelector('.popup__close_type_add-card');
    const addButton = document.querySelector('.popup__button_type_add-card');
    const saveButton = document.querySelector('.popup__button_type_edit');
    const editButton = document.querySelector('.user-info__edit-button');
    const avatarContainer = document.querySelector('.user-info__photo');
    const popupAvatarChangeContainer = document.querySelector('.popup_type_avatar');
    const popupAvatarClose = document.querySelector('.popup__close_type_avatar');
    const saveAvatarButton = document.querySelector('.popup__button_type_avatar');
    const inputAvatarPopup = document.querySelector('#linkAvatar');
    const nameEdit = document.querySelector('#nameEdit');
    const jobEdit = document.querySelector('#jobEdit');
    const nameForm = document.querySelector('#nameForm');

    /!**API const*!/
    const config = {
        url: 'https://praktikum.tk/cohort11',
        headers: {
            authorization: 'e12f1602-2248-40d3-b961-19aa86fb3b4d',
            'Content-Type': 'application/json'
        }
    };

    //============================================================
    /!*функции*!/
    function createCard(...arg) {
        return new Card(...arg);
    }

    function addCardList(name, link, likes, idName, idOwner, hasLike) {
        cardList.addCard(name, link, likes, idName, idOwner, hasLike, idOwner)
    }

    function modifyUserInfo(checkedName, checkedJob) {
        userInfo.setUserInfo(checkedName, checkedJob);
        userInfo.updateUserInfo()
    }

    function modifyAvatar(avatarChecked, name, about) {
        userInfo.setUserInfo(name, about, avatarChecked);
        userInfo.setAvatar()
    }

    function validateInput(event) {
        formValidator.handlerInputForm(event)
    }

    function validateSubmit(event) {
        return formValidator.checkForm(event)
    }

    function openPicturePopup(event) {
        imagePopup.open(event)
    }

    /!**инициализация классов*!/
    const formValidator = new FormValidator();
    const userInfo = new UserInfo(userInfoName, userInfoJob, userInfoPhoto);
    const api = new Api(config);
    const cardList = new CardList(
        cardContainer,
        createCard,
        api,
        template,
        openPicturePopup);
    const addCardPopup = new AddCardPopup(
        addCardList,
        validateInput,
        validateSubmit,
        form,
        createCard,
        api,
        root,
        popupWindowContainer,
        addButton,
        errorNameForm,
        errorLinkForm,
        nameForm);
    const imagePopup = new ImagePopup(popupWindowPicture, popupWindowPictureContainer, popupPictureClose);
    const editFormPopup = new EditFormPopup(
        editButton,
        popupEditClose,
        validateInput,
        validateSubmit,
        formEditUserInfoData,
        modifyUserInfo,
        api,
        userInfoName,
        userInfoJob,
        root,
        popupWindowEditContainer,
        saveButton,
        nameEdit,
        jobEdit,
        errorNameEdit,
        errorJobEdit);
    const changeAvatarPopup = new ChangeAvatarPopup(
        avatarContainer,
        popupAvatarClose,
        validateInput,
        validateSubmit,
        formChangeAvatar,
        modifyAvatar,
        api,
        popupAvatarChangeContainer,
        saveAvatarButton,
        errorAvatarEdit,
        root,
        inputAvatarPopup);

    //========================================================
    /!*В пятницу Андрей Строгов посвятил половину вебинара теме Promise.all, и как это круто для данной работы.
     Если не надо, или в чем-то ошибся - верну все обратно. Но все работает.*!/
    // Создаём массив с промисами
    const promises = [api.getUserInfo(), api.getCards()];

    // Передаём массив с промисами методу Promise.all
    Promise.all(promises)
    /!*
       Можно лучше:
       - В данном случае приемлемо обрабатывать через Promise.all, но
       представьте ситуацию, если у Вас один запрос не выполнится? Возможно, Вашему приложению не повредит,
       если профиль не отрендерится, а корточки - да.
      *!/
        .then(([res1, res2]) => {
            userInfo.setUserInfo(res1.name, res1.about, res1.avatar);
            /!**устанавливает юзера*!/
            userInfo.updateUserInfo();
            userInfo.setAvatar();
            cardList.render(res2, res1._id);
            /!**первоначально рендерит карточки*!/
        })
        .catch(err =>
            console.log(err));


    /!**установка слушателей форм*!/
    addCardPopup.setEventListeners(plusButton, popupClose);
    editFormPopup.setEventListeners();
    changeAvatarPopup.setEventListeners();
})
();*/

/*
 Что понравилось:
 - Отображается количество лайков, есть возможность их проставить и удалить.
 - Есть возможность обновить аватар
 - Есть возможность удалить карточку
 - Есть возможность добавить карточку
 - При ожидании ответа с сервера отображается "Загрузка"
 - Есть комментарии

 Можно лучше:
 - Поработать над форматированием кода.
 - Попытаться избавитсья от передачи такого количества параметров в классы
 - Почитать про метод Array forEach

 Полезные материалы:
 Статья про построение async/await API на английском https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp
 */
