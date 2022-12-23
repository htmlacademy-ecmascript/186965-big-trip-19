import dayjs from 'dayjs';


const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const isOfferChecked = (checked) => Object.values(checked).some(Boolean);

const isEscapeKey = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export { getRandomArrayElement, getRandomNumber, humanizeDate, isOfferChecked, isEscapeKey };
