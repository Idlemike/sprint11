class ChangeAvatarPopup extends Popup {
    constructor(
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
        inputAvatarPopup) {
        super();

        this.avatarContainer = avatarContainer;
        this.popupAvatarClose = popupAvatarClose;
        this.validateInput = validateInput;
        this.validateSubmit = validateSubmit;
        this.formChangeAvatar = formChangeAvatar;
        this.modifyAvatar = modifyAvatar;
        this.api = api;
        this.popupAvatarChangeContainer = popupAvatarChangeContainer;
        this.saveAvatarButton = saveAvatarButton;
        this.errorAvatarEdit = errorAvatarEdit;
        this.root = root;
        this.inputAvatarPopup = inputAvatarPopup;
    }

    /**Обработчик клика клавы*/
    handleEscKey(event){
        super.handleEscKey(event, this.popupAvatarChangeContainer)
    };
    /**обработчик клика changeAvatar*/
    close = () => {
        super.close(this.popupAvatarChangeContainer);
        this.root.removeEventListener('keydown', this.handleEscKey);
        this.formChangeAvatar.reset();
        this.errorAvatarEdit.textContent = '';
    };


    /**обработчик клика по аватару*/
    open() {
        super.open(this.popupAvatarChangeContainer);
        this.inputAvatarPopup.focus();
        this.root.addEventListener('keydown', this.handleEscKey);
    };

    /**   установка аватара*/
    installAvatar = (avatarChecked, name, about) => {
        this.modifyAvatar(avatarChecked);
        this.formChangeAvatar.reset();
        this.popupAvatarChangeContainer.classList.remove('popup_is-opened');
        this.saveAvatarButton.classList.remove('popup__button_valid');
        this.saveAvatarButton.classList.add('popup__button_invalid');
        this.saveAvatarButton.setAttribute('disabled', 'disabled');
    };

    /**Обработчик submit изменить аватар*/
    handleSubmitAvatar = event => {
        event.preventDefault();
        if (this.validateSubmit(event)) {
            this.linkAvatar = this.formChangeAvatar.elements.linkAvatar;
            //=============================================
            //отправляем запрос на сервер
            this.api.postAvatar(this.linkAvatar)
                .then((res) => {
                    this.installAvatar(res.avatar, res.name,  res.about)
                })
                .catch(err => console.log(err))
        }
    };

    setEventListeners() {
        this.avatarContainer.addEventListener('click', this.open.bind(this));
        this.formChangeAvatar.addEventListener('input', (event) => this.validateInput(event), true);
        this.formChangeAvatar.addEventListener('submit', (event) => this.handleSubmitAvatar(event));
        this.popupAvatarClose.addEventListener('click', this.close.bind(this));
    }
}
