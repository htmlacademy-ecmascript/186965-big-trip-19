import { createElement } from '../../render.js';

const createTripMainInfoBlockTemplate = () => '<section class="trip-main__trip-info  trip-info"></section';


export default class NewTripMainInfoBlockView {
  getTemplate() {
    return createTripMainInfoBlockTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
