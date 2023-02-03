import WaypointPresenter from './waypoint-presenter.js';
import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { render, remove } from '../../framework/render.js';

import { tripsEventsContainerElement } from '../../main.js';
import { SortType, UpdateType, UserAction } from '../../const.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../../utils/sort.js';

export default class WaypointsListPresenter {
  #tripsList = null;
  #pointsModel = null;

  #waypointListComponent = new TripEventsListView();
  #waypointPresenter = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DAY;

  #noPointComponent = new NoPointView();


  constructor(tripsList, pointsModel) {
    this.#tripsList = tripsList;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);

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

    this.#renderPointsList();
  }

  #renderPoint(point) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      onWaypointChange: this.#handleViewAction,
      onWaypointModeChange: this.#handleWaypointModeChange
    });

    waypointPresenter.init(point);
    this.#waypointPresenter.set(point.id, waypointPresenter);
  }


  #renderPointsList() {
    this.#renderSortView();

    const pointCount = this.points.length;
    const points = this.points.slice();


    if (!pointCount) {
      this.#renderNoPoints();
      return;
    }

    this.#renderWaypointList();

    points.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });

  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#tripsList);
  }

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
    this.#clearWaypointsList({ resetSortType: false });
    this.#renderPointsList();
  };

  #renderSortView() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, tripsEventsContainerElement);
  }

  #clearWaypointsList({ resetSortType = false } = {}) {

    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#pointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#pointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#pointsModel.deleteWaypoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearWaypointsList();
        this.#renderPointsList();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearWaypointsList({ resetSortType: true });
        this.#renderPointsList();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


}
