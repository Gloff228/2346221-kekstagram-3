const checkLegitLength = function(string, minLength, maxLength) {
  return string >= minLength && string <= maxLength;
}

const isEscapeKey = function(evt) {
  return evt.key === 'Escape';
}

const escKeydownHandler = function(element, onKeydownFunction) {
  function eventHandler(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onKeydownFunction();
    }
  }
  element.addEventListener('keydown', eventHandler);

  return eventHandler;
}

const anotherAreaClickHandler = function(element, selector, onClickFunction) {
  const eventHandler = function(evt) {
    if (evt.target === document.querySelector(selector)) {
      onClickFunction();
    }
  }
  element.addEventListener('click', eventHandler);

  return eventHandler;
}

const addPrewiewInformation = function(information) {
  const prewiew = document.querySelector('.img-upload__preview img');
  information.src = prewiew.src;
  information.scale = prewiew.style.transform;
  information.class = prewiew.classList[0];
  information.filter = prewiew.style.filter;
}

const convertDataToInformation = function(formData) {
  const information = {
    description: formData.get('description'),
    hashtags: formData.get('hashtags')
  };
  addPrewiewInformation(information);
  return information;
}

export {checkLegitLength, convertDataToInformation, escKeydownHandler, anotherAreaClickHandler};
