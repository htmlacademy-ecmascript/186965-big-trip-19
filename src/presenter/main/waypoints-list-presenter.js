import WaypointPresenter from './waypoint-presenter.js';
import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { updateWaypoint } from '../../utils/common.js';
import { render } from '../../framework/render.js';

import { tripsEventsContainerElement } from '../../main.js';
import { SortType } from '../../const.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../../utils/sort.js';

export default class WaypointsListPresenter {
  #pointsContainer = null;
  #tripsList = null;
  #pointsModel = null;

  #tripPoints = [];

  #waypointListComponent = new TripEventsListView();
  #waypointPresenter = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(tripsList, pointsModel, sourcedPoints) {
    this.#tripsList = tripsList;
    this.#pointsModel = pointsModel;
    this.#sourcedPoints = sourcedPoints;

  }

  init() {

    this.#tripPoints = [...this.#pointsModel.points].sort(sortPointsByDay);
    this.#sourcedPoints = [...this.#pointsModel.points].sort(sortPointsByDay);
    this.#renderSortView();
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      onWaypointChange: this.#handleWaypointDataChange,
      onWaypointModeChange: this.#handleWaypointModeChange
    });

    waypointPresenter.init(point);
    this.#waypointPresenter.set(point.id, waypointPresenter);
  }


  #renderPointsList() {
    if (!this.#tripPoints.length) {
      render(new NoPointView(), this.#tripsList);
      return;
    }

    this.#renderWaypointList();
    this.#tripPoints.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });

  }

  #handleWaypointDataChange = (updatedWaypoint) => {
    this.#tripPoints = updateWaypoint(this.#tripPoints, updatedWaypoint);
    this.#sourcedPoints = updateWaypoint(this.#sourcedPoints, updatedWaypoint);
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #handleWaypointModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderWaypointList() {
    render(this.#waypointListComponent, tripsEventsContainerElement);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedPoints].sort(sortPointsByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearWaypointsList();
    this.#renderPointsList();
  };

  #renderSortView() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, tripsEventsContainerElement);
  }

  #clearWaypointsList() {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
  }

}
