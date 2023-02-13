import AbstractView from '../../framework/view/abstract-view.js';

const createTripFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return (`
  <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`);
};


const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createTripFilterItemTemplate(filter, currentFilterType)).join('');

  return (` <div class="trip-controls__filters">
<h2 class="visually-hidden">Filter events</h2>
<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  </div>`);
};


export default class TripFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;


  constructor({ filters, currentFilter, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
