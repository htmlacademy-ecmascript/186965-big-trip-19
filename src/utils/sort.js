import dayjs from 'dayjs';
import { getTripDatesDifference } from '../utils/point.js';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

const sortPointsByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateTo, pointB.dateTo);

  return weight ?? dayjs(pointA.dateTo).diff(dayjs(pointB.dateTo));
};


const sortPointsByTime = (pointA, pointB) => {
  const pointATime = getTripDatesDifference(pointA.dateTo, pointA.dateFrom);
  const pointBTime = getTripDatesDifference(pointB.dateTo, pointB.dateFrom);

  return pointATime - pointBTime;
};


const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


export { sortPointsByDay, sortPointsByTime, sortPointsByPrice };
