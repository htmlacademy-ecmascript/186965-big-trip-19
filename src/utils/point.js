import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from '../const.js';

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const isOfferChecked = (checked) => Object.values(checked).some(Boolean);

const getTripDatesDifference = (dateFrom, dateTo) => Math.floor(dayjs(dayjs(dateTo).diff(dayjs(dateFrom)))) / 60000;

const getTripDuration = (dateFrom, dateTo) => {
  const difference = getTripDatesDifference(dateFrom, dateTo);


  switch (true) {
    case (difference < MINUTES_PER_HOUR):
      return dayjs.duration(difference, 'minutes').format('mm[M]');

    case (difference >= MINUTES_PER_HOUR && difference < MINUTES_PER_DAY):
      return dayjs.duration(difference, 'minutes').format('HH[H] mm[M]');

    case (difference >= MINUTES_PER_DAY):
      return dayjs.duration(difference, 'minutes').format('DD[D] HH[H] mm[M]');
  }
};


const isFutureTrip = (dateFrom) => dayjs().isBefore(dayjs(dateFrom));

const isPresentTrip = (dateFrom, dateTo) => dayjs().isSameOrBefore(dayjs(dateFrom)) && dayjs().isSameOrAfter(dateTo);

const isPastTrip = (dateTo) => dayjs().isAfter(dateTo);

export { humanizeDate, isOfferChecked, getTripDuration, isFutureTrip, isPresentTrip, isPastTrip, getTripDatesDifference };

