
// View
import EventTripPointView from '../../view/main/event-point-view.js';
import EditTripPointView from '../../view/main/edit-event-point-view.js';
import NoPointView from '../../view/main/no-point-view.js';
import TripEventsListView from '../../view/main/trip-events-list-view.js';
import TripSortView from '../../view/main/trip-sort-view.js';

import { render } from '../../render.js';
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
    const pointComponent = new EventTripPointView({ point });
    const pointEditComponent = new EditTripPointView({ point });

    const replacePointToEditForm = () => {
      this.#tripsList.querySelector('.trip-events__list').replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#tripsList.querySelector('.trip-events__list').replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyPress = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint();

        document.removeEventListener('keydown', onEscKeyPress);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyPress);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
    });

    pointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyPress);
    });


    render(pointComponent, this.#tripsList.querySelector('.trip-events__list'));

  }

  #renderPointsList() {
    if (this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#tripsList);
    } else {
      render(new TripSortView(), tripsEventsContainerElement);
      render(new TripEventsListView(), tripsEventsContainerElement);
      this.#tripPoints.forEach((tripPoint) => {
        this.#renderPoint(tripPoint);
      });
    }
  }

}
