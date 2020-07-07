class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    /**получаем с сервера имя и проффесию*/
    getUserInfo = async () => {
        this.response = await fetch(this.url + '/users/me', {
            headers: this.headers
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**получаем с сервера массив карточек*/
    getCards = async () => {
        this.response = await fetch(this.url + '/cards', {
            headers: this.headers
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**отправляем на сервер новые имя и проффесию*/
    postUserInfo = async (yourName, job) => {
        /*
         Можно лучше:
         - postUserInfo -> patchUserInfo
        */
        this.response = await fetch(this.url + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({name: yourName.value, about: job.value})
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };
    /**отправляем на сервер запрос на создание новой карточки*/
    createCard = async (name, link) => {
        this.response = await fetch(this.url + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name: name.value, link: link.value})
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**отправляем на сервер like*/
    putLike = async (cardId) => {
        this.cardId = cardId;
        this.response = await fetch(this.url + '/cards/like/' + this.cardId, {
            method: 'PUT',
            headers: this.headers,
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**снимаем на сервере like*/
    deleteLike = async (cardId) => {
        this.cardId = cardId;
        this.response = await fetch(this.url + '/cards/like/' + this.cardId, {
            method: 'DELETE',
            headers: this.headers,
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**убираем карточку*/
    deleteCard = async (cardId) => {
        this.cardId = cardId;
        this.response = await fetch(this.url + '/cards/' + this.cardId, {
            method: 'DELETE',
            headers: this.headers,
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    };

    /**Меняем аватар*/
    postAvatar = async (linkAvatar) => {
        this.response = await fetch(this.url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({avatar: linkAvatar.value})
        });
        if (this.response.ok) {
            return await this.response.json();
        }
        return Promise.reject(this.response.status);
    }
}
