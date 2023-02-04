import { humanizeDate } from '../../utils/point.js';
import { DATE_TIME_EDIT_EVENT, POINT_TYPES } from '../../const.js';
import { mockOffersTypes } from '../../mock/offers.js';
import { mockDestinations } from '../../mock/destinations.js';

import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const getAllPointTypeOffers = (point) => {
  const { type } = point;
  const pointTypeOffer = mockOffersTypes.find((offer) => offer.type === type);

  return pointTypeOffer;
};

const allDestinationsValues = Object.values(mockDestinations);
const allDestinationPictures = Object.values(mockDestinations);


const createPointOffersTemplate = (point) => {

  const allPointTypeOffers = getAllPointTypeOffers(point);

  if (!allPointTypeOffers) {
    return [];
  }

  return allPointTypeOffers.offers.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.type}-${offer.id}" type="checkbox" name="event-offer-luggage" ${offer.checked ? 'checked' : ''} value="${offer.id}">
      <label class="event__offer-label" for="event-offer-${point.type}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div> `)).join('');
};

const createPointEventTemplate = (currentType) => {
  const pointEventItem = POINT_TYPES.map((item) => (`<div class="event__type-item">
    <input id="event-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${item}" for="event-type--${item}-1">${item}</label>
  </div>`)
  ).join('');

  return pointEventItem;
};

const createDestinationsTemplate = () => allDestinationsValues.map((destination) => `<option value="${destination.name}"></option>`).join('');


const createDestinationPicturesTemplate = (point) => {
  const { destinationName } = point;

  const destinationPictures = allDestinationPictures.find((item) => destinationName === item.name);

  return destinationPictures.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

};


const createEditEventPointTemplate = (point) => {
  const { dateFrom, type, basePrice, dateTo, destinationName, destination } = point;

  const dateFromEvent = humanizeDate(dateFrom, DATE_TIME_EDIT_EVENT);
  const dateToEvent = humanizeDate(dateTo, DATE_TIME_EDIT_EVENT);

  const repeatingOfferTemplate = createPointOffersTemplate(point);
  const createPointTypeTemplate = createPointEventTemplate(type);
  const destinationTemplate = createDestinationsTemplate();
  const picturesTemplate = createDestinationPicturesTemplate(point);


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
        <label class="event__label  event__type-output" for="event-destination-1"> ${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
        <datalist id="destination-list-1">
 ${destinationTemplate}
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
        <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${picturesTemplate}
                      </div>
                    </div>
      </section>
    </section>
  </form>
  </li>`;

};


export default class EditTripPointView extends AbstractStatefulView {
  #onFormSubmit = null;
  #onEditArrowClickClose = null;
  #datepickerForm = null;
  #datepickerTo = null;

  #handleDeleteClick = null;

  constructor({ point, onFormSubmit, onEditClickClose, onDeleteClick }) {
    super();
    this._setState(EditTripPointView.parsePointToState(point));
    this.#onFormSubmit = onFormSubmit;
    this.#onEditArrowClickClose = onEditClickClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();

  }

  get template() {
    return createEditEventPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#onClosePointFormEdit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClosePointEditForm);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#onEventPointChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onFormDeleteClick);

    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOfferCheckboxChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);

    this.#setDatepickerDateForm();
    this.#setDatepickerDateTo();

  }

  #onClosePointFormEdit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditTripPointView.parseStateToPoint(this._state));
  };


  #onClosePointEditForm = (evt) => {
    evt.preventDefault();
    this.#onEditArrowClickClose(EditTripPointView.parsePointToState(this._state));
  };


  #onEventPointChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.outerText,
      offers: this._state.type === evt.target.outerText ? this._state.offers : []
    });

  };


  #onDestinationChange = (evt) => {
    evt.preventDefault();

    const selectedDestination = allDestinationsValues.find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destinationName: evt.target.value,
      destination: selectedDestination.description
    });

  };

  reset(point) {
    this.updateElement(
      EditTripPointView.parseStateToPoint(point)
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerForm) {
      this.#datepickerForm.destroy();
      this.#datepickerForm = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #eventDateFromChange = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom
    });
  };

  #eventDateToChange = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo
    });
  };


  #setDatepickerDateForm() {

    this.#datepickerForm = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#eventDateFromChange,
        enableTime: true

      },
    );

  }

  #setDatepickerDateTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#eventDateToChange,
        enableTime: true
      }
    );

  }

  #onFormDeleteClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditTripPointView.parsePointToState(this._state));
  };


  #onOfferCheckboxChange = (evt) => {
    evt.preventDefault();

  };


  #onPriceChange = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: evt.target.value
    });
  };


  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };

  }

}
