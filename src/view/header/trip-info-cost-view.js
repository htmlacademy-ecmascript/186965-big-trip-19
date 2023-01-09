import AbstractView from '../../framework/view/abstract-view.js';


const createTripInfoCostTemplate = (waypoints) => {
  let totalPrice = 0;

  waypoints.forEach((waypoint) => {
    totalPrice += waypoint.basePrice;
  });


  return `<p class="trip-info__cost">
Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`;
};

export default class NewTripInfoCostView extends AbstractView {
  #totalPrice = null;

  constructor(totalPrice) {
    super();

    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoCostTemplate(this.#totalPrice);
  }

}
