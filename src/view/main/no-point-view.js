import AbstractView from '../../framework/view/abstract-view.js';
import { NoPointTextType } from '../../const.js';

const createNoPointTemplate = (filterType) => {
  const noPointValue = NoPointTextType[filterType];

  return `<p class="trip-events__msg">${noPointValue}</p>`;
};


export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
