
import WaypointsListPresenter from './waypoints-list-presenter.js';
import NewPointButtonView from '../../view/header/new-point-button-view.js';

import { render } from '../../framework/render.js';

export default class TripBoardPresenter {
  #tripsEventsContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #waypointListPresenter = null;

  #newEventButtonComponent = null;

  #headerContainer = null;

  constructor({ tripsEventsContainer, filterModel, headerContainer, pointsModel }) {
    this.#tripsEventsContainer = tripsEventsContainer;
    this.#filterModel = filterModel;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    // this.#pointsModel.init().finally(() => {
    //   this.#renderNewEventButton();
    // });

    this.#renderNewEventButton();
    this.#renderWaypointsList();

  }

  #renderWaypointsList() {
    this.#waypointListPresenter = new WaypointsListPresenter({
      tripsEventsContainer: this.#tripsEventsContainer,
      pointsModel: this.#pointsModel,
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
