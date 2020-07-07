'use strict';

class FormValidator {

//Валидация
    /**Функция проверки поля на ошибки, возвращает истину если поле валидно или ложь в противном случае, устанавливает кастомное сообщение об ошибке*/
    isValidate(input) {
        input.setCustomValidity(""); //устанавливаем свойсво validity.customError в false
        // если на инпуте есть атрибут required, поле validity.valueMissing будет true / false (заполнено)
        if (input.validity.valueMissing) {
            // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
            input.setCustomValidity(errorMessages.empty);
            return false
        }
        // если на инпуте есть атрибут minlength, поле validity.tooShort будет true / false (достигнута мин. длина)
        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessages.wrongLength);
            return false
        }
        // если на инпуте есть атрибут type, поле validity.typeMismatch будет true / false (сопадение типа)
        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(errorMessages.wrongUrl);
            return false
        }
        if (input.validity.rangeOverflow) {
            /** REVIEW: Можно лучше:
             *
             * Переменная max объявлена, но не используется, рекомендую ее убрать.
             */
            let max = input.getAttribute('max');
            input.setCustomValidity(errorMessages.wrongLength);
            return false
        }
        return input.checkValidity();
    }

    /**Функция добавления/удаления ошибки с инпута, возвращает true если поле валидно, false в противном случае*/
    isFieldValid = (input) => {
        this.errorElem = input.parentNode.querySelector(`#${input.id}-error`);
        this.valid = this.isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
        this.errorElem.textContent = input.validationMessage;
        return this.valid;
    };

    /**Функция проверки формы на валидность, возвращает true если форма валидна   */
    isFormValid = (form) => { //validateForm
        this.inputs = [...form.elements];
        this.valid = true;
        this.inputs.forEach((input) => {
            if (input.type !== 'submit' && input.type !== 'button') {
                if (!this.isFieldValid(input)) this.valid = false;
            }
        });
        return this.valid;
    };

    /**Функци активации и деактивации кнопки, state = true кнопка выклчается, false выключается.*/
    setSubmitButtonState = (button, state) => {
        if (state) {

            button.removeAttribute('disabled');
            button.classList.add(`popup__button_valid`);
            button.classList.remove(`popup__button_invalid`);
        } else {
            button.setAttribute('disabled', 'disabled');
            button.classList.add(`popup__button_invalid`);
            button.classList.remove(`popup__button_valid`);
        }
    };

    /**Фунция слушатесь события на input */
    handlerInputForm = (event) => {
        const submit = event.currentTarget.querySelector('.button');
        const [...inputs] = event.currentTarget.elements; // превращаем итератор(итерируемый объект) в массив
        this.isFieldValid(event.target); // проверяем поле на валидность и выводим ошибку если не валидно.
        if (inputs.every(this.isValidate)) { // если каждый инпут формы вернул true, то включаем кнопку в противном случае выключаем
            this.setSubmitButtonState(submit, true);
        }
    };

    /**Функция отправки формы*/
    checkForm = (event) => {
        event.preventDefault();
        this.currentForm = event.target;
        return this.isFormValid(this.currentForm);
    };
}
