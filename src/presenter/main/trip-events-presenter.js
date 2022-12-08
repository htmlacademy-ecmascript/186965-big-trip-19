import NewEventTripPointView from '../../view/main/event-point-view.js';
import NewEditTripPointView from '../../view/main/edit-event-point-view.js';

import { render, RenderPosition } from '../../render.js';

export default class TripEventListPresenter {

  constructor(tripsList) {
    this.tripsList = tripsList;
  }

  init() {


    for (let i = 0; i < 3; i++) {
      render(new NewEventTripPointView(), this.tripsList.querySelector('.trip-events__list'));
    }


    render(new NewEditTripPointView(), this.tripsList.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }
}
