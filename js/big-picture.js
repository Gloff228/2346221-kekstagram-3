import {escKeydownHandler, anotherAreaClickHandler} from './util.js';

let onBigPictureEscKeydown;
let onAnotherAreaClick;
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureComments = bigPictureSection.querySelector('.comments-count');
const bigPictureCloseButton = bigPictureSection.querySelector('.big-picture__cancel');
const authorComment = bigPictureSection.querySelector('.social__caption');

const onPictureClick = function(evt) {
  const element = evt.target.closest('.picture');
  if (element) {
    const image = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes').textContent;
    const comments = element.querySelector('.picture__comments').textContent;

    bigPictureImg.src = image.src;
    bigPictureImg.style.transform = image.style.transform;
    bigPictureImg.classList = image.classList;
    bigPictureImg.style.filter = image.style.filter;

    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments;
    authorComment.textContent = image.alt;

    bigPictureSection.classList.remove('hidden');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    onBigPictureEscKeydown = escKeydownHandler(document, closeBigPicture);
    onAnotherAreaClick = anotherAreaClickHandler(document, '.big-picture', closeBigPicture);
  }
}

const closeBigPicture = function() {
  bigPictureSection.classList.add('hidden');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.removeEventListener('click', onAnotherAreaClick);
}

export {onPictureClick};
