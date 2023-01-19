import { render, replace, remove } from '../../framework/render.js';
import { isEscapeKey } from '../../utils/common.js';

import EventTripPointView from '../../view/main/event-point-view.js';
import EditTripPointView from '../../view/main/edit-event-point-view.js';
import { WaypointMode } from '../../const.js';

export default class WaypointPresenter {
  #waypointsListComponent = null;
  #waypointComponent = null;
  #waypointEditComponent = null;
  #waypoint = null;

  #onWaypointDataChange = null;
  #onWaypointModeChange = null;

  #mode = WaypointMode.DEFAULT;


  constructor({ waypointList, onWaypointChange, onWaypointModeChange }) {
    this.#waypointsListComponent = waypointList;
    this.#onWaypointDataChange = onWaypointChange;
    this.#onWaypointModeChange = onWaypointModeChange;
  }


  init(point) {
    this.#waypoint = point;

    const previousPointComponent = this.#waypointComponent;
    const previousPointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new EventTripPointView({
      point: this.#waypoint,
      onEditClickOpen: this.#onEditClick,
      onFavouriteClick: this.#onFavouriteClick,
    });


    this.#waypointEditComponent = new EditTripPointView({
      point: this.#waypoint,
      onFormSubmit: this.#onFormSubmit,
      onEditClickClose: this.#onFormSubmit
    });


    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointsListComponent);
      return;
    }


    if (this.#mode === WaypointMode.EDITING) {
      replace(this.#waypointEditComponent, previousPointEditComponent);
    }


    if (this.#waypointsListComponent.contains(previousPointEditComponent.element)) {
      replace(this.#waypointEditComponent, previousPointEditComponent);
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
      this.#replaceEditFormToPoint();
    }
  }

  #onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
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


  #onEditClick = () => {
    this.#replacePointToEditForm();
  };

  #onFormSubmit = (point) => {
    this.#onWaypointDataChange(point);
    this.#replaceEditFormToPoint();
  };


  #onFavouriteClick = () => {
    this.#onWaypointDataChange({ ...this.#waypoint, isFavorite: !this.#waypoint.isFavorite });
  };
}
