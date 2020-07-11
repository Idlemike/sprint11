'use strict';

export default class Card {
    placeCard = '.place-card';
    placeCardLikeIcon = '.place-card__like-icon';
    placeCardImage = '.place-card__image';
    placeCardLikeIconLiked = 'place-card__like-icon_liked';
    placeCardDeleteIcon = '.place-card__delete-icon';
    constructor(template, name, link, likes, idName, idOwner, hasLike, api, userInfoId, openPicturePopup) {
        this.template = template;
        this.name = name;
        this.link = link;
        this.likes = likes;
        this.idName = idName;
        this.idOwner = idOwner;
        this.hasLike = hasLike;
        this._api = api;
        this.userInfoId = userInfoId;
        this.openPicturePopup = openPicturePopup;
    }

    //изменение колличества лайков
    changeLikeNumbers = (card, res) => {
        card.querySelector('.place-card__like-number').textContent = res["likes"].length;
    };

//функция обработчик like
    _like = (event) => {

        this.cardId = event.target.closest(this.placeCard).id;
        this.card = event.target.closest(this.placeCard);
        if (event.target.classList.contains(this.placeCardLikeIconLiked)) {
            this._api.deleteLike(this.cardId).then((res) => {
                event.target.classList.toggle(this.placeCardLikeIconLiked);
                return this.changeLikeNumbers(this.card, res);
            }).catch(err => console.log(err))
        } else {
            this._api.putLike(this.cardId).then((res) => {
                event.target.classList.toggle(this.placeCardLikeIconLiked);
                return this.changeLikeNumbers(this.card, res);
            }).catch(err => console.log(err))
        }
    };
// Создаёт элемент карточки и возвращает его
    create = () => {
        this._view = this.template.cloneNode(true).children[0];
        this._view.querySelector('.place-card__name').textContent = this.name;
        this._view.querySelector(this.placeCardImage).style.backgroundImage = `url(${this.link})`;
        this._view.querySelector('.place-card__like-number').textContent = this.likes;
        this._view.setAttribute('id', this.idName);
        this._view.setAttribute('dataIdOwner', this.idOwner);

        if (this.idOwner === this.userInfoId) {
            this._view.querySelector(this.placeCardDeleteIcon).addEventListener('click', this._delClickHandler);
            this._view.querySelector(this.placeCardDeleteIcon).classList.add('place-card__delete-icon_show');
        }
        if (this.hasLike) {
            this._view.querySelector(this.placeCardLikeIcon).classList.add(this.placeCardLikeIconLiked)
        }
        this._view.querySelector(this.placeCardLikeIcon).addEventListener('click', this._like);
        this._view.querySelector(this.placeCardImage).addEventListener('click', (event) => this.openPicturePopup(event), true);
        return this._view
    };


    // Удаляет элемент карточки
    _delClickHandler = (event) => {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            this.cardId = event.target.closest('.place-card').id;
            this._api.deleteCard(this.cardId).then(() => {
                this._view.querySelector(this.placeCardDeleteIcon).removeEventListener('click', this._delClickHandler);
                this._view.querySelector(this.placeCardLikeIcon).removeEventListener('click', this._like);
                this._view.querySelector(this.placeCardImage).removeEventListener('click', (event) => this.openPicturePopup(event), true);
                return this._view.remove();

            }).catch(err => console.log(err))
        }
    }
}

