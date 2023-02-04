
import WaypointsListPresenter from './waypoints-list-presenter.js';
import TripPointModel from '../../models/trip-point-model.js';
import NewPointButtonView from '../../view/main/trip-sort-view.js';

import { render } from '../../framework/render.js';

export default class TripBoardPresenter {
  #tripComponent = null;
  #pointModel = null;
  #filterModel = null;
  #onNewPointDestroy = null;

  #waypointListPresenter = null;

  #newEventButtonComponent = null;

  #headerContainer = null;

  constructor({ tripComponent, filterModel, headerContainer }) {
    this.#tripComponent = tripComponent;
    this.#filterModel = filterModel;
    // this.#onNewPointDestroy = onNewPointDestroy;
    this.#headerContainer = headerContainer;

  }

  init() {
    this.#pointModel = new TripPointModel();
    // this.#renderNewEventButton();
    this.#renderWaypointsList();

  }

  #renderWaypointsList() {
    this.#waypointListPresenter = new WaypointsListPresenter({
      pointListContainer: this.#tripComponent,
      pointModel: this.#pointModel,
      filterModel: this.#filterModel,
    });

    this.#waypointListPresenter.init();
  }

  // #renderNewPoint = () => {
  //   this.#waypointListPresenter.createNewPoint();
  //   this.#newEventButtonComponent.element.disabled = true;
  // };

  // #renderNewEventButton() {
  //   this.#newEventButtonComponent = new NewPointButtonView({
  //     addClick: this.#renderNewPoint
  //   });

  // render(this.#newEventButtonComponent, this.#headerContainer);
  // }

}
