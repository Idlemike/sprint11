class ImagePopup extends Popup {
    constructor(
        popupWindowPicture,
        popupWindowPictureContainer,
        popupPictureClose
        /*
         Можно лучше:
         - Перенести параметр на следующую строку
        */
    ) {
        super();
        this.popupWindowPicture = popupWindowPicture;
        this.popupWindowPictureContainer = popupWindowPictureContainer;
        this.popupPictureClose = popupPictureClose;

    }

    /**Обработчик клика по закрыть попап картинки*/
    close = () => {
        super.close(this.popupWindowPictureContainer);
        this.popupPictureClose.removeEventListener('click', this.close);
    };

    checkImgSrc(imageUrl) {
        // напишите код здесь
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = reject;
        })
    }
    /**Обработчик клика по картинке*/
    open = (event) => {
        if (event.target.classList.contains('place-card__image')) {
            let img = event.target.style.backgroundImage;
            this.img = img.replace(/(url\(|\)|")/g, '');
            this.checkImgSrc(this.img)
                .then(() => {
                    this.popupWindowPicture.setAttribute("src", this.img);
                    super.open(this.popupWindowPictureContainer);
                    this.popupPictureClose.addEventListener('click', this.close);
                })
                .catch((err) => {
                    console.log(`invalid src: ${img} ${err.type}`);
                    this.img = 'images/404.jpg';
                    this.popupWindowPicture.setAttribute("src", this.img);
                    super.open(this.popupWindowPictureContainer);
                    this.popupPictureClose.addEventListener('click', this.close);
                });
        }
    }
}
