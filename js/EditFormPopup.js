class EditFormPopup extends Popup {
    constructor(editButton,
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
                errorJobEdit,
    ) {
        super();
        this.editButton = editButton;
        this.popupEditClose = popupEditClose;
        this.validateInput = validateInput;
        this.validateSubmit = validateSubmit;
        this.formEditUserInfoData = formEditUserInfoData;
        this.modifyUserInfo = modifyUserInfo;
        this.api = api;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
        this.root = root;
        this.popupWindowEditContainer = popupWindowEditContainer;
        this.saveButton = saveButton;
        this.nameEdit = nameEdit;
        this.jobEdit = jobEdit;
        this.errorNameEdit = errorNameEdit;
        this.errorJobEdit = errorJobEdit;
    }

    /**Обработчик клика клавы*/
    handleEscKey(event) {
        super.handleEscKey(event, this.popupWindowEditContainer);
    };

    /** Обработчик клика по кнопке «CloseEditWindow»*/
    close() {
        super.close(this.popupWindowEditContainer);
        this.root.removeEventListener('keydown', this.handleEscKey);
        this.formEditUserInfoData.reset();
        this.errorNameEdit.textContent = '';
        this.errorJobEdit.textContent = '';
    };

    /**смена userInfo*/
    changeUserInfo = (checkedName, checkedJob) => {
        this.modifyUserInfo(checkedName, checkedJob);
        this.formEditUserInfoData.reset();
        this.saveButton.textContent = 'Сохранить';
        this.popupWindowEditContainer.classList.remove('popup_is-opened');
        this.saveButton.classList.remove('popup__button_valid');
        this.saveButton.classList.add('popup__button_invalid');
        this.saveButton.setAttribute('disabled', 'disabled');
    };

    /**обработчик submit Редактирует профиль*/
    handleSubmitUserInfo = event => {
        event.preventDefault();

        if (this.validateSubmit(event)) {
            this.saveButton.textContent = 'Загрузка...';
            this.yourName = this.formEditUserInfoData.elements.yourName;
            this.job = this.formEditUserInfoData.elements.job;
            //=============================================
            //отправляем запрос на сервер
            this.api.postUserInfo(this.yourName, this.job)
                .then(res => {
                    this.changeUserInfo(res.name, res.about)
                })
                .catch(err => console.log(err))
        }
    };

    /**   Обработчик клика по кнопке «edit»*/
    open() {
        this.nameEdit.value = this.userInfoName.textContent;
        this.jobEdit.value = this.userInfoJob.textContent;
        super.open(this.popupWindowEditContainer);
        this.nameEdit.focus();
        this.root.addEventListener('keydown', this.handleEscKey);
    };


    setEventListeners() {
        this.editButton.addEventListener('click', this.open.bind(this));
        this.popupEditClose.addEventListener('click', this.close.bind(this));
        this.formEditUserInfoData.addEventListener('input', (event) => this.validateInput(event), true);
        this.formEditUserInfoData.addEventListener('submit', this.handleSubmitUserInfo);

    }
}
