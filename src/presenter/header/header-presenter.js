
import NewTripInfoMainView from '../../view/header/trip-main-info-view.js';
import NewTripInfoCostView from '../../view/header/trip-info-cost-view.js';


import { render } from '../../render.js';


export default class HeaderPresenter {

  constructor(headerContainer) {
    this.headerContainer = headerContainer;
  }

  init() {
    render(new NewTripInfoMainView(), this.headerContainer.querySelector('.trip-info'));
    render(new NewTripInfoCostView(), this.headerContainer.querySelector('.trip-info'));
  }
}
