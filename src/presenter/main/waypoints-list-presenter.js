import WaypointPresenter from './waypoint-presenter.js';
import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { render } from '../../framework/render.js';

import { tripsEventsContainerElement } from '../../main.js';
import { SortType } from '../../const.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../../utils/sort.js';

export default class WaypointsListPresenter {
  #pointsContainer = null;
  #tripsList = null;
  #pointsModel = null;

  #waypointListComponent = new TripEventsListView();
  #waypointPresenter = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DAY;


  constructor(tripsList, pointsModel) {
    this.#tripsList = tripsList;
    this.#pointsModel = pointsModel;

  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }
    return [...this.#pointsModel.points].sort(sortPointsByDay);
  }

  init() {

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
    const pointCount = this.points.length;
    const points = this.points.slice();


    if (!pointCount) {
      render(new NoPointView(), this.#tripsList);
      return;
    }

    this.#renderWaypointList();

    points.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });

  }

  #handleWaypointDataChange = (updatedWaypoint) => {
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #handleWaypointModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderWaypointList() {
    render(this.#waypointListComponent, tripsEventsContainerElement);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
