import { render, replace, remove } from '../../framework/render.js';
import { isEscapeKey } from '../../utils/common.js';

import EventTripPointView from '../../view/main/event-point-view.js';
import EditTripPointView from '../../view/main/edit-event-point-view.js';
import { WaypointMode } from '../../const.js';

import { UserAction, UpdateType } from '../../const.js';
import { isDatesEqual } from '../../utils/point.js';

export default class WaypointPresenter {
  #waypointsListComponent = null;
  #waypointComponent = null;
  #waypointEditComponent = null;
  #waypoint = null;

  #onWaypointDataChange = null;
  #onWaypointModeChange = null;

  #mode = WaypointMode.DEFAULT;
  #filterType = null;


  constructor({ waypointList, onWaypointChange, onWaypointModeChange, filterType }) {
    this.#waypointsListComponent = waypointList;
    this.#onWaypointDataChange = onWaypointChange;
    this.#onWaypointModeChange = onWaypointModeChange;
    this.#filterType = filterType;
  }


  init(point) {
    this.#waypoint = point;

    const previousPointComponent = this.#waypointComponent;
    const previousPointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new EventTripPointView({
      point: this.#waypoint,
      onEditClickOpen: this.#openPointEditForm,
      onFavouriteClick: this.#clickFavouriteBtn,
    });


    this.#waypointEditComponent = new EditTripPointView({
      point: this.#waypoint,
      onFormSubmit: this.#formSubmit,
      onEditClickClose: this.#closeEditForm,
      onDeleteClick: this.#handleDeleteClick
    });


    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointsListComponent);
      return;
    }


    if (this.#mode === WaypointMode.EDITING) {
      replace(this.#waypointEditComponent, previousPointEditComponent);
    }


    if (this.#mode === WaypointMode.DEFAULT) {
      replace(this.#waypointComponent, previousPointComponent);
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  resetView() {
    if (this.#mode !== WaypointMode.DEFAULT) {
      this.#waypointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();
    }
  }

  #onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#waypointEditComponent.reset(this.#waypoint);
      this.#replaceEditFormToPoint();

    }
  };


  #replacePointToEditForm() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#onEscKeyPress);
    this.#onWaypointModeChange();
    this.#mode = WaypointMode.EDITING;
  }


  #replaceEditFormToPoint() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyPress);
    this.#mode = WaypointMode.DEFAULT;
  }


  #openPointEditForm = () => {
    this.#replacePointToEditForm();
  };


  #formSubmit = (update) => {
    const isDatesFromEqual = isDatesEqual(this.#waypoint.dateFrom, update.dateFrom);
    const isDatesToEqual = isDatesEqual(this.#waypoint.dateTo, update.dateTo);
    const isMinorUpdate = !isDatesFromEqual || !isDatesToEqual;
    const updateType = isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH;

    this.#onWaypointDataChange(
      UserAction.UPDATE_WAYPOINT,
      updateType,
      update
    );

    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (task) => {
    this.#onWaypointDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      task
    );
  };

  #closeEditForm = () => {
    this.#waypointEditComponent.reset(this.#waypoint);
    this.#replaceEditFormToPoint();
  };

  #clickFavouriteBtn = () => {
    this.#onWaypointDataChange(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.MINOR,
      { ...this.#waypoint, isFavourite: !this.#waypoint.isFavourite }
    );
  };
}
