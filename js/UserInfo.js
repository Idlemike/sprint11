'use strict';

/**редактирование имя профессия и аватар*/
class UserInfo {

    constructor({userInfoName, userInfoJob, userInfoPhoto}) {
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
        this.userInfoPhoto = userInfoPhoto
    }

//меняет аватар
    setAvatar = () => {
        this.userInfoPhoto.style.backgroundImage = `url(${this.url})`;
    };
    //обновляет значения свойств
    setUserInfo(name, about, url) {
        this.name = name;
        this.job = about;
        this.url = url;
    };
    //меняет данные юзера
    updateUserInfo = () => {
        this.userInfoName.textContent = this.name;
        this.userInfoJob.textContent = this.job;
    }
}

