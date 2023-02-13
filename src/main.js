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

import PointApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic QRHZ8VOva8N0OPa4';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip';


const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls');
const tripsEventsContainerElement = document.querySelector('.trip-events');

const pointsModel = new TripPointModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

//header

render(new NewTripMainInfoBlockView(), tripMainElement, RenderPosition.AFTERBEGIN);


const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel: pointsModel
});


const headerPresenter = new HeaderPresenter({
  headerContainer: tripMainElement,
  pointsModel: pointsModel
});

filterPresenter.init();
headerPresenter.init();


//main
const mainPresenter = new TripBoardPresenter({
  tripsEventsContainer: tripsEventsContainerElement,
  filterModel: filterModel,
  headerContainer: tripMainElement,
  pointsModel: pointsModel
});

mainPresenter.init();


export { tripsEventsContainerElement };
