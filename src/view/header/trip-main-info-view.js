import { createElement } from '../../render.js';

// разметка блок с информацией о путешествии
const createTripInfoMainTemplate = () => `<div class="trip-info__main">
<h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

<p class="trip-info__dates">Mar 18 — 20</p>
</div>`;


// класс для создания блока с информацией о путешествии
export default class NewTripInfoMainView {

  // метод получения разметки
  getTemplate() {
    return createTripInfoMainTemplate();
  }


  // метод создания блока с информацией о путешествии
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }


  // метод удаления блока с информацией о путешествии
  removeElement() {
    this.element = null;
  }
}
