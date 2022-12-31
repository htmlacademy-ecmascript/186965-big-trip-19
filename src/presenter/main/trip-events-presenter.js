
// View
import EventTripPointView from '../../view/main/event-point-view.js';
import EditTripPointView from '../../view/main/edit-event-point-view.js';
import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { render } from '../../framework/render.js';
import { isEscapeKey } from '../../utils.js';

import { tripsEventsContainerElement } from '../../main.js';

export default class TripEventListPresenter {
  #tripsList = null;
  #pointsModel = null;
  #tripPoints = [];


  constructor(tripsList, pointsModel) {
    this.#tripsList = tripsList;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }


  #renderPoint(point) {
    const onEscKeyPress = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint.call(this);

        document.removeEventListener('keydown', onEscKeyPress);
      }
    };

    const pointComponent = new EventTripPointView({
      point,
      onEditClickOpen: () => {
        replacePointToEditForm.call(this);
        document.addEventListener('keydown', onEscKeyPress);
      }
    });

    const pointEditComponent = new EditTripPointView({
      point,
      onFormSubmit: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyPress);
      },
      onEditClickClose: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', onEscKeyPress);
      }
    });


    function replacePointToEditForm() {
      this.#tripsList.querySelector('.trip-events__list').replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceEditFormToPoint() {
      this.#tripsList.querySelector('.trip-events__list').replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#tripsList.querySelector('.trip-events__list'));

  }

  #renderPointsList() {
    if (!this.#tripPoints.length) {
      render(new NoPointView(), this.#tripsList);
      return;
    }


    render(new TripSortView(), tripsEventsContainerElement);
    render(new TripEventsListView(), tripsEventsContainerElement);
    this.#tripPoints.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });

  }

}
