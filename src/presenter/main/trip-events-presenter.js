
import WaypointsListPresenter from './waypoints-list-presenter.js';
import TripPointModel from '../../models/trip-point-model.js';
import NewPointButtonView from '../../view/header/new-point-button-view.js';

import { render } from '../../framework/render.js';

export default class TripBoardPresenter {
  #tripComponent = null;
  #pointModel = null;
  #filterModel = null;

  #waypointListPresenter = null;

  #newEventButtonComponent = null;

  #headerContainer = null;

  constructor({ tripComponent, filterModel, headerContainer }) {
    this.#tripComponent = tripComponent;
    this.#filterModel = filterModel;
    this.#headerContainer = headerContainer;

  }

  init() {
    this.#pointModel = new TripPointModel();
    this.#renderNewEventButton();
    this.#renderWaypointsList();

  }

  #renderWaypointsList() {
    this.#waypointListPresenter = new WaypointsListPresenter({
      pointListContainer: this.#tripComponent,
      pointModel: this.#pointModel,
      filterModel: this.#filterModel,
      onNewPointDestroy: this.#handleNewTaskFormClose
    });

    this.#waypointListPresenter.init();
  }

  #renderNewPoint = () => {
    this.#waypointListPresenter.createNewPoint();
    this.#newEventButtonComponent.element.disabled = true;
  };

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewPointButtonView({
      handleAddClick: this.#renderNewPoint
    });

    render(this.#newEventButtonComponent, this.#headerContainer);
  }

  #handleNewTaskFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

}
