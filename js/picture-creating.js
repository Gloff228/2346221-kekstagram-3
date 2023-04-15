import {onPictureClick} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureDisplay = document.querySelector('.pictures');

const drawPictures = function(informationList) {
  const pictureFragment = document.createDocumentFragment();

  for (const information of informationList) {
    const picture = pictureTemplate.cloneNode(true);

    const pictureImage = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureImage.src = information.url;
    pictureImage.alt = information.description;
    pictureComments.textContent = information.comments;
    pictureLikes.textContent = information.likes;

    pictureFragment.append(picture);
  }
  pictureDisplay.append(pictureFragment);
  pictureDisplay.addEventListener('click', onPictureClick);
}

const addPicture = function(information) {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImage = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');
  pictureComments.textContent = 0;
  pictureLikes.textContent = 0;

  pictureImage.src = information.src;
  pictureImage.alt = `${information.description} ${information.hashtags}`;
  pictureImage.style.transform = information.scale;
  pictureImage.classList.add(information.class);
  pictureImage.style.filter = information.filter;
  pictureDisplay.append(picture);
}

export {drawPictures, addPicture};
