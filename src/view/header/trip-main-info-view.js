import AbstractView from '../../framework/view/abstract-view.js';

const createTripInfoMainTemplate = () => `<div class="trip-info__main">
<h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

<p class="trip-info__dates">Mar 18 — 20</p>
</div>`;


export default class NewTripInfoMainView extends AbstractView {
  get template() {
    return createTripInfoMainTemplate();
  }
}
