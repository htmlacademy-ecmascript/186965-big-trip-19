const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train', 'Upgrade to a business class'];
const TRIP_EVENTS_AMOUNT = 3;

const START_DATE_FORMAT = 'MMM DD';
const DATE_TIME_EVENT = 'YYYY-MM-DD';
const DATE_TIME_EDIT_EVENT = 'DD/MM/YY';
const DATE_TIME = 'HH:mm';
const DATE = 'D';
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;


const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


const MULTIPLE_DOTS = '...';
const MAX_VISIBLE_CITIES_COUNT = 4;

export { POINT_TYPES, OFFERS, TRIP_EVENTS_AMOUNT, START_DATE_FORMAT, DATE_TIME_EVENT, DATE_TIME_EDIT_EVENT, DATE_TIME, MINUTES_PER_HOUR, MINUTES_PER_DAY, FilterType, MULTIPLE_DOTS, MAX_VISIBLE_CITIES_COUNT, DATE };
