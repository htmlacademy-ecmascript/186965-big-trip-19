// View
import NewTripMainInfoBlockView from './view/header/trip-info-block-view.js';
import NewTripControlsFiltersView from './view/header/trip-controls-filters-view.js';

import NewTripSortView from './view/main/trip-sort-view.js';
import NewTripEventsListView from './view/main/trip-events-list-view.js';


// Presenter
import HeaderPresenter from './presenter/header/header-presenter.js';
import TripEventListPresenter from './presenter/main/trip-events-presenter.js';

// Model
import TripPointModel from './models/trip-point-model.js';

import { render, RenderPosition } from './render.js';


const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls');
const headerPresenter = new HeaderPresenter(tripMainElement);

const tripsEventsContainerElement = document.querySelector('.trip-events');

const pointModel = new TripPointModel();

//header
render(new NewTripMainInfoBlockView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new NewTripControlsFiltersView(), tripControlsFiltersElement);

headerPresenter.init();


//main
render(new NewTripSortView(), tripsEventsContainerElement);
render(new NewTripEventsListView(), tripsEventsContainerElement);

const mainPresenter = new TripEventListPresenter(
  tripsEventsContainerElement,
  pointModel);

mainPresenter.init();
