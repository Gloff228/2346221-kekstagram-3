const preview = document.querySelector('.img-upload__preview img');
const valueField = document.querySelector('.scale__control--value');

const onControlSmallerButtonClick = function() {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) - 25;

  if (percent >= 25) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '25%';
  }
};

const onControlBiggerButtonClick = function() {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) + 25;

  if (percent <= 100) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '100%';
  }
};

const setPictureScale = function(value) {
  preview.style.transform = `scale(${value/100})`;
}

export {onControlBiggerButtonClick, onControlSmallerButtonClick, setPictureScale};
