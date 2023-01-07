import AbstractView from '../../framework/view/abstract-view.js';

const createTripInfoCostTemplate = () => `<p class="trip-info__cost">
Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`;


export default class NewTripInfoCostView extends AbstractView {
  get template() {
    return createTripInfoCostTemplate();
  }

}
