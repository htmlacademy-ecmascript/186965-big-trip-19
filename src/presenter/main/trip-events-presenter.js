
// View

import WaypointsListPresenter from './waypoints-list-presenter.js';

import TripPointModel from '../../models/trip-point-model.js';

export default class TripBoardPresenter {
  #tripComponent = null;
  #pointModel = null;
  #filterModel = null;

  constructor({ tripComponent, filterModel }) {
    this.#tripComponent = tripComponent;
    this.#filterModel = filterModel;

  }

  init() {
    this.#pointModel = new TripPointModel();

    this.#renderWaypointsList();
  }

  #renderWaypointsList() {
    const waypointListPresenter = new WaypointsListPresenter({
      tripsList: this.#tripComponent,
      pointModel: this.#pointModel,
      filterModel: this.#filterModel
    });

    waypointListPresenter.init();
  }
}
