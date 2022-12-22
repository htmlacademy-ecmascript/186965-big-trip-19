
// View
import EventTripPointView from '../../view/main/event-point-view.js';
import EditTripPointView from '../../view/main/edit-event-point-view.js';

import { render } from '../../render.js';
import { isEscapeKey } from '../../utils.js';


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

    this.#tripPoints.forEach((tripPoint) => {
      this.#renderPoint(tripPoint);
    });
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

    const onEscKey = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint();

        document.removeEventListener('keydown', onEscKey);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKey);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
    });

    pointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKey);
    });


    render(pointComponent, this.#tripsList.querySelector('.trip-events__list'));

  }
}
