'use strict';

class Popup {

    /**функция закрытия попапа*/
    close(popup) {
        popup.classList.remove('popup_is-opened');
    };

    /**Обработчик клика клавы*/
    handleEscKey = (event, popup) => {
        if (event.key === 'Escape') {
            this.close(popup);
        }
    };

    /**функция открытия попапа */
    open(popup) {
        popup.classList.add('popup_is-opened');
    };


}
