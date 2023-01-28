import { humanizeDate } from '../../utils/point.js';
import { DATE_TIME_EDIT_EVENT, POINT_TYPES } from '../../const.js';
import { mockOffersTypes } from '../../mock/offers.js';


import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const getAllPointTypeOffers = (point) => {
  const { type } = point;

  const pointTypeOffer = mockOffersTypes.find((offer) => offer.type === type);

  return pointTypeOffer;
};


const createPointOffersTemplate = (point) => {

  const allPointTypeOffers = getAllPointTypeOffers(point);

  const createCheckedTripOffersTemplate = allPointTypeOffers.offers.map((offer) => {
    const checkedOffers = point.offers.includes(offer.id) ? offer.checked : '';

    return (
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.type}-1" type="checkbox" name="event-offer-luggage" ${checkedOffers ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div> `);
  }).join('');

  return createCheckedTripOffersTemplate;
};


const createPointEventTemplate = (currentType) => {
  const pointEventItem = POINT_TYPES.map((item) => (`<div class="event__type-item">
    <input id="event-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${item}" for="event-type--${item}-1">${item}</label>
  </div>`)
  ).join('');

  return pointEventItem;
};


const createEditEventPointTemplate = (point) => {
  const { dateFrom, type, basePrice, dateTo, destinationName, destination } = point;

  const dateFromEvent = humanizeDate(dateFrom, DATE_TIME_EDIT_EVENT);
  const dateToEvent = humanizeDate(dateTo, DATE_TIME_EDIT_EVENT);

  const repeatingOfferTemplate = createPointOffersTemplate(point);
  const createPointTypeTemplate = createPointEventTemplate(type);


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createPointTypeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1"> ${type} </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromEvent}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToEvent}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${basePrice}</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
${repeatingOfferTemplate}

      </div>

        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description"> ${destination}</p>
      </section>
    </section>
  </form>
  </li>`;

};


export default class EditTripPointView extends AbstractStatefulView {
  #onFormSubmit = null;
  #onEditArrowClickClose = null;


  constructor({ point, onFormSubmit, onEditClickClose }) {
    super();
    this._setState(EditTripPointView.parsePointToState(point));
    this.#onFormSubmit = onFormSubmit;
    this.#onEditArrowClickClose = onEditClickClose;

    console.log(this._state);
    this._restoreHandlers();

  }

  get template() {
    return createEditEventPointTemplate(this._state);
  }

  #closePointFormEdit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditTripPointView.parseStateToPoint(this._state));
  };


  #closePointEditForm = (evt) => {
    evt.preventDefault();
    this.#onEditArrowClickClose(EditTripPointView.parseStateToPoint(this._state));
  };


  #onEventPointChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };


  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#closePointFormEdit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closePointEditForm);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onEventPointChange);

  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };

  }

}
