import AbstractView from '../../framework/view/abstract-view.js';
import { MULTIPLE_DOTS, MAX_VISIBLE_CITIES_COUNT, DATE, START_DATE_FORMAT } from '../../const.js';
import { humanizeDate } from '../../utils/point.js';


const createTripInfoMainTemplate = (waypoints) => {

  const startCity = waypoints[0].destinationName;
  let middleCities = waypoints[waypoints.length / 2].destinationName;
  const endCity = waypoints[waypoints.length - 1].destinationName;

  let routeWaypoint = '';

  if (waypoints.length > MAX_VISIBLE_CITIES_COUNT) {
    middleCities = MULTIPLE_DOTS;
  }

  switch (waypoints.length) {
    case 1:
      routeWaypoint = startCity;
      break;
    default:
      routeWaypoint = `${startCity} &mdash; ${middleCities} &mdash; ${endCity}`;
  }

  const waypointStartDate = humanizeDate(waypoints[0].dateFrom, START_DATE_FORMAT);
  const waypointEndDate = humanizeDate(waypoints[waypoints.length - 1].dateFrom, DATE);

  return (`<div class="trip-info__main">
<h1 class="trip-info__title">${routeWaypoint}</h1>

<p class="trip-info__dates">${waypointStartDate} &mdash; ${waypointEndDate}</p>
</div>`);
};


export default class NewTripInfoMainView extends AbstractView {
  #waypoints = null;

  constructor(waypoints) {
    super();

    this.#waypoints = waypoints;
  }

  get template() {
    return createTripInfoMainTemplate(this.#waypoints);
  }
}
