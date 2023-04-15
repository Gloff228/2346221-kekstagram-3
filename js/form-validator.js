import {checkLegitLength, convertDataToInformation} from './util.js';
import {sendData} from './api.js';
import {addPicture} from './picture-creating.js';
import {showErrorMessage, showSuccessMessage} from './submit-message.js';

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateCommentLength = function(value) {
  return checkLegitLength(value.length, 20, 140);
}

const validateHashTags = function(value) {
  if (value.length === 0) {
    return true;
  }
  const hashTags = value.split(' ');

  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  for (let i = 0; i < hashTags.length; i++) {
    if (!regex.test(hashTags[i])) {
      return false;
    }
  }

  for (let i = 0; i < hashTags.length - 1; i++) {
    for (let j = i + 1; j < hashTags.length; j++) {
      if (hashTags[i].substring(1).toLowerCase() === hashTags[j].substring(1).toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}

pristine.addValidator(
  form.querySelector('.text__description'),
  validateCommentLength,
  'От 20 до 140 символов'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTags,
  'Неверный формат ХэшТегов'
);

const blockSubmitButton = function() {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаю...';
}

const unblockSubmitButton = function() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

const submitForm = function(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const sentInformation = new FormData(evt.target);
      sendData(
        () => {
          addPicture(convertDataToInformation(sentInformation));
          showSuccessMessage();
          unblockSubmitButton();
          onSuccess();
        },
        () => {
          showErrorMessage('Ошибка загрузки файла');
          unblockSubmitButton();
        },
        sentInformation,
      );
    }
  });
}

export {pristine, submitForm};
