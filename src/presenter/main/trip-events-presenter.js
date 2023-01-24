
// View

import WaypointsListPresenter from './waypoints-list-presenter.js';

import TripPointModel from '../../models/trip-point-model.js';

export default class TripBoardPresenter {
  #tripComponent = null;
  #pointsModel = null;

  constructor(tripComponent) {
    this.#tripComponent = tripComponent;

  }

  init() {
    this.#pointsModel = new TripPointModel();

    this.#renderWaypointsList();
  }

  #renderWaypointsList() {
    const waypointListPresenter = new WaypointsListPresenter(
      this.#tripComponent,
      this.#pointsModel,
      this.#pointsModel,
    );

    waypointListPresenter.init();
  }
}
