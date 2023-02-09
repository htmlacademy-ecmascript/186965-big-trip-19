import { render, replace, remove } from '../../framework/render.js';
import TripFilterView from '../../view/header/trip-controls-filters-view.js';
import { filter } from '../../utils/filter.js';
import { FilterType, UpdateType } from '../../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;

  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.points;

    return [
      {
        type: FilterType.ALL,
        name: 'everything',
        count: filter[FilterType.ALL](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PRESENT,
        name: 'present',
        count: filter[FilterType.PRESENT](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: filter[FilterType.PAST](points).length,
      },

    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
