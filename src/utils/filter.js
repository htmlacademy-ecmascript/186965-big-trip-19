
import { FilterType } from '../const.js';
import { isFutureTrip, isPresentTrip, isPastTrip } from '../utils/point.js';


const filterWaypointValue = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureTrip(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentTrip(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastTrip(point.dateTo)),
};

export { filterWaypointValue };

