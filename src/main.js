// View
import NewTripMainInfoBlockView from './view/header/trip-info-block-view.js';

// Presenter
import HeaderPresenter from './presenter/header/header-presenter.js';
import TripBoardPresenter from './presenter/main/trip-events-presenter.js';
import FilterPresenter from './presenter/header/filter-presenter.js';

// Model
import TripPointModel from './models/trip-point-model.js';
import FilterModel from './models/filter-model.js';

import { render, RenderPosition } from './framework/render.js';

//mock

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls');
const tripsEventsContainerElement = document.querySelector('.trip-events');

const pointModel = new TripPointModel();
const filterModel = new FilterModel();

//header

render(new NewTripMainInfoBlockView(), tripMainElement, RenderPosition.AFTERBEGIN);


const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointModel
});


const headerPresenter = new HeaderPresenter({
  headerContainer: tripMainElement,
  pointModel
});

filterPresenter.init();
headerPresenter.init();


//main
const mainPresenter = new TripBoardPresenter({
  tripComponent: tripsEventsContainerElement,
  filterModel: filterModel,
  headerContainer: tripMainElement
});

mainPresenter.init();


export { tripsEventsContainerElement };
