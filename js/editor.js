import {escKeydownHandler} from './util.js';
import {pristine} from './form-validator.js';
import {onEffectButtonClick, setEffect, createSlider, destroySlider} from './effects-setting.js';
import {onControlBiggerButtonClick, onControlSmallerButtonClick, setPictureScale} from './picture-scale.js';

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

const openEditor = function() {
  const uploadedImage =  document.querySelector('#upload-file').files[0];
  const fileReader = new FileReader();
  createSlider();

  body.classList.add('modal-open');
  editor.classList.remove('hidden');

  fileReader.onloadend = function() {
    preview.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedImage);

  onEditorEscKeydown = escKeydownHandler(document, closeEditor);
  effects.addEventListener('change', onEffectButtonClick);
  scaleSmallerButton.addEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onControlBiggerButtonClick);
  closeEditorButton.addEventListener('click', closeEditor);
}

const closeEditor = function() {
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

export {openEditor, closeEditor};
