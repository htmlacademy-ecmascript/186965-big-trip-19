import AbstractView from '../framework/view/abstract-view.js';

const createAddPointButtonTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';


export default class NewPointButtonView extends AbstractView {
  #handleAddClick = null;

  constructor({ handleAddClick }) {
    super();


    this.#handleAddClick = handleAddClick;

    this.element.addEventListener('click', this.#onAddBtnClick);
  }

  #onAddBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleAddClick();
  };

  get template() {
    return createAddPointButtonTemplate();
  }
}
