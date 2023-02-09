
import NewTripInfoMainView from '../../view/header/trip-main-info-view.js';
import NewTripInfoCostView from '../../view/header/trip-info-cost-view.js';

import { render } from '../../framework/render.js';


export default class HeaderPresenter {
  #headerContainer = null;
  #pointModel = null;
  #tripPoints = [];


  constructor({ headerContainer, pointModel }) {
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
  }

  init() {

    this.#tripPoints = [...this.#pointModel.points];

    if (this.#tripPoints.length) {
      render(new NewTripInfoMainView(this.#tripPoints), this.#headerContainer.querySelector('.trip-info'));
      render(new NewTripInfoCostView(this.#tripPoints), this.#headerContainer.querySelector('.trip-info'));
    }
  }
}
