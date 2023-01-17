
// View

import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { render } from '../../framework/render.js';

import { tripsEventsContainerElement } from '../../main.js';
import WaypointPresenter from './waypoint-presenter.js';
import { updateWaypoint } from '../../utils/common.js';

export default class TripEventListPresenter {
  #tripsList = null;
  #pointsModel = null;
  #tripPoints = [];
  #tripSortComponent = new TripSortView();
  #waypointListComponent = new TripEventsListView();
  #waypointPresenter = new Map();


  constructor(tripsList, pointsModel) {
    this.#tripsList = tripsList;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }


  #renderPoint(point) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      onWaypointChange: this.#onWaypointChange,
      onWaypointModeChange: this.#onWaypointModeChange
    });

    waypointPresenter.init(point);
    this.#waypointPresenter.set(point.id, waypointPresenter);
  }


  #renderPointsList() {
    if (!this.#tripPoints.length) {
      render(new NoPointView(), this.#tripsList);
      return;
    }


    this.#renderSortView();
    this.#renderWaypointList();
    this.#tripPoints.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });

  }

  #renderSortView() {
    render(this.#tripSortComponent, tripsEventsContainerElement);
  }

  #renderWaypointList() {
    render(this.#waypointListComponent, tripsEventsContainerElement);
  }

  #clearWaypointsList() {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
  }

  #onWaypointChange = (updatedWaypoint) => {
    this.#tripPoints = updateWaypoint(this.#tripPoints, updatedWaypoint);
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #onWaypointModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

}
