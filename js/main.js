import {drawPictures} from './picture-creating.js';
import {loadPictures} from './api.js';
import {submitForm} from './form-validator.js';
import {closeEditor} from './editor.js';
import {showErrorMessage} from './submit-message.js';

loadPictures(
  (picuturesInfo) => {
    drawPictures(picuturesInfo);
  },
  () => {
    showErrorMessage('Ошибка подключения к серверу');
  }
);

submitForm(closeEditor);
