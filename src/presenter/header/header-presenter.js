
import NewTripInfoMainView from '../../view/header/trip-main-info-view.js';
import NewTripInfoCostView from '../../view/header/trip-info-cost-view.js';


import { render } from '../../framework/render.js';


export default class HeaderPresenter {
  #headerContainer = null;
  #pointsModel = null;
  #tripPoints = [];

  constructor(headerContainer, pointsModel) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
  }

  init() {

    this.#tripPoints = [...this.#pointsModel.points];

    if (this.#tripPoints.length) {
      render(new NewTripInfoMainView(), this.#headerContainer.querySelector('.trip-info'));
      render(new NewTripInfoCostView(), this.#headerContainer.querySelector('.trip-info'));
    }
  }
}
