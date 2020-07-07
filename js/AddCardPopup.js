class AddCardPopup extends Popup {
    constructor(
        addCardList,
        /*
         Можно лучше:
         - Для большей читабельности первый параметр лучше перенести на следующую строку
        */
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
        nameForm
    ) {
        super();
        this.addCardList = addCardList;
        this.validateInput = validateInput;
        this.validateSubmit = validateSubmit;
        this.form = form;
        this.createCard = createCard;
        this.api = api;
        this.root = root;
        this.popupWindowContainer = popupWindowContainer;
        this.addButton = addButton;
        this.errorNameForm = errorNameForm;
        this.errorLinkForm = errorLinkForm;
        this.nameForm = nameForm
    }

    /**Обработчик клика клавы*/
    handleEscKey(event) {
        super.handleEscKey(event, this.popupWindowContainer);
    };

    /**  Обработчик клика по кнопке «CloseWindow»*/
    close(event) {
        super.close(this.popupWindowContainer);
        this.form.reset();
        this.root.removeEventListener('keydown', this.handleEscKey);
        this.errorNameForm.textContent = '';
        this.errorLinkForm.textContent = '';
    };

    /**     обработчик submit addCard*/
    handleAddCardSubmit = event => {
        event.preventDefault();

        if (this.validateSubmit(event)) {
            this.addButton.textContent = 'Загрузка...';
            this.addButton.style.fontSize = '18px';
            this.name = this.form.elements.name;
            this.link = this.form.elements.link;
            //=============================================
            //отправляем запрос на сервер
            this.api.createCard(this.name, this.link).then((res) => {
                this.hasLike = false;
                this.addCardList(res.name, res.link, this.likes, res._id, res.owner._id, this.hasLike, res.owner._id);
                this.form.reset();
                this.addButton.textContent = '+';
                this.addButton.style.fontSize = '36px';
                this.popupWindowContainer.classList.remove('popup_is-opened');
                this.addButton.classList.remove('popup__button_valid');
                this.addButton.classList.add('popup__button_invalid');
                this.addButton.setAttribute('disabled', 'disabled');
            }).catch(err => console.log(err))
        }
    };

    /**функция попап открытия*/
    open() {
        super.open(this.popupWindowContainer);
        this.nameForm.focus();
        this.root.addEventListener('keydown', this.handleEscKey);
    };


    setEventListeners(plusButton, popupClose) {
        plusButton.addEventListener('click', this.open.bind(this));
        popupClose.addEventListener('click', this.close.bind(this));
        this.form.addEventListener('input', (event) => this.validateInput(event), true);
        this.form.addEventListener('submit', (event) => this.handleAddCardSubmit(event));

    }
}
