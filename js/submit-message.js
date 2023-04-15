import {escKeydownHandler, anotherAreaClickHandler} from './util.js';

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('.error');
let onMessageEscKeydown;
let onAnotherAreaClick;

function showSuccessMessage() {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage);
  onMessageEscKeydown = escKeydownHandler(document, closeSuccessMessage);
  onAnotherAreaClick = anotherAreaClickHandler(document, '.success', closeSuccessMessage);
  body.append(successMessage);
  successMessage.style.zIndex = '9999';
}

function showErrorMessage(text) {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorTitle = errorMessage.querySelector('.error__title');
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.textContent = 'Закрыть';
  errorTitle.textContent = text;

  errorButton.addEventListener('click', closeErrorMessage);
  onMessageEscKeydown = escKeydownHandler(document, closeErrorMessage);
  onAnotherAreaClick = anotherAreaClickHandler(document, '.error', closeErrorMessage);
  body.append(errorMessage);
  errorMessage.style.zIndex = '9999';
}

function closeSuccessMessage() {
  const successButton = body.querySelector('.success__button');

  successButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('click', onAnotherAreaClick);
  document.removeEventListener('keydown', onMessageEscKeydown);

  body.querySelector('.success').remove();
}

function closeErrorMessage() {
  const errorButton = body.querySelector('.error__button');

  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('click', onAnotherAreaClick);
  document.removeEventListener('keydown', onMessageEscKeydown);

  body.querySelector('.error').remove();
}

export {showErrorMessage, showSuccessMessage};
