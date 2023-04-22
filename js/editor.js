import {createOnEscKeydownFunction} from './util.js';
import {pristine} from './form-validator.js';
import {onEffectButtonClick, setEffect, createSlider, destroySlider} from './effects-setting.js';
import {onControlBiggerButtonClick, onControlSmallerButtonClick, setPictureScale} from './picture-scale.js';
import {showErrorMessage} from './submit-message.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
let onEditorEscKeydown;
const body = document.querySelector('body');
const form = body.querySelector('#upload-select-image');
const editor = form.querySelector('.img-upload__overlay');
const uploadButton = form.querySelector('#upload-file');
const scaleSmallerButton = editor.querySelector('.scale__control--smaller');
const scaleBiggerButton = editor.querySelector('.scale__control--bigger');
const preview = editor.querySelector('.img-upload__preview img');
const effects = editor.querySelector('.effects__list');
const closeEditorButton = editor.querySelector('#upload-cancel');

const openEditor = () => {
  const uploadedImage =  document.querySelector('#upload-file').files[0];
  const imageName = uploadedImage.name.toLowerCase();
  body.classList.add('modal-open');
  editor.classList.remove('hidden');

  const matches = FILE_TYPES.some((it) => {
    return imageName.endsWith(it);
  });

  if (matches) {
    preview.src = URL.createObjectURL(uploadedImage);

    createSlider();
    onEditorEscKeydown = createOnEscKeydownFunction(document, closeEditor);
    effects.addEventListener('change', onEffectButtonClick);
    scaleSmallerButton.addEventListener('click', onControlSmallerButtonClick);
    scaleBiggerButton.addEventListener('click', onControlBiggerButtonClick);
    closeEditorButton.addEventListener('click', closeEditor);
  } else {
    body.classList.remove('modal-open');
    editor.classList.add('hidden');
    showErrorMessage('Неверный формат файла');
  }

}

const closeEditor = () => {
  destroySlider();
  setEffect('none');
  setPictureScale(100);

  body.classList.remove('modal-open');
  editor.classList.add('hidden');
  preview.className = '';

  document.removeEventListener('keydown', onEditorEscKeydown);
  effects.removeEventListener('change', onEffectButtonClick);
  scaleSmallerButton.removeEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onControlBiggerButtonClick);
  closeEditorButton.removeEventListener('click', closeEditor);
  form.reset();
  pristine.reset();
}

uploadButton.addEventListener('change', openEditor);

export {closeEditor};
