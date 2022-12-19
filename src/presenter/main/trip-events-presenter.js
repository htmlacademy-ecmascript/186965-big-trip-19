
// View
import NewEventTripPointView from '../../view/main/event-point-view.js';
import NewEditTripPointView from '../../view/main/edit-event-point-view.js';


import { render, RenderPosition } from '../../render.js';

export default class TripEventListPresenter {

  constructor(tripsList, pointsModel) {
    this.tripsList = tripsList;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new NewEventTripPointView({ point: this.tripPoints[i] }), this.tripsList.querySelector('.trip-events__list'));
    }

    render(new NewEditTripPointView({ point: this.tripPoints[0] }), this.tripsList.querySelector('.trip-events__list'), RenderPosition.AFTERBEGIN);
  }
}
