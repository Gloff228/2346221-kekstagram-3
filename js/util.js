const checkLegitLength = (string, minLength, maxLength) => {
  return string >= minLength && string <= maxLength;
}

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
}

const createOnEscKeydownFunction = (element, onKeydownFunction) => {
  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onKeydownFunction();
    }
  }
  element.addEventListener('keydown', onEscKeydown);

  return onEscKeydown;
}

const createOnAnotherAreaClickFunction = (element, selector, onClickFunction) => {
  const onAnotherAreaClick = (evt) => {
    if (evt.target === document.querySelector(selector)) {
      onClickFunction();
    }
  }
  element.addEventListener('click', onAnotherAreaClick);

  return onAnotherAreaClick;
}

const addPrewiewInformation = (information) => {
  const prewiew = document.querySelector('.img-upload__preview img');
  information.src = prewiew.src;
  information.scale = prewiew.style.transform;
  information.class = prewiew.classList[0];
  information.filter = prewiew.style.filter;
}

const convertDataToInformation = (formData) => {
  const information = {
    description: formData.get('description'),
    hashtags: formData.get('hashtags')
  };
  addPrewiewInformation(information);
  return information;
}

export {checkLegitLength, convertDataToInformation, createOnEscKeydownFunction, createOnAnotherAreaClickFunction};
