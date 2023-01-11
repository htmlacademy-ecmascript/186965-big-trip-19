const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export { getRandomArrayElement, getRandomNumber, isEscapeKey };
