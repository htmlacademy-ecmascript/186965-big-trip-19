import { createElement } from '../../render.js';

const createTripMainInfoBlockTemplate = () => '<section class="trip-main__trip-info  trip-info"></section';


export default class NewTripMainInfoBlockView {
  #element = null;


  get template() {
    return createTripMainInfoBlockTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
