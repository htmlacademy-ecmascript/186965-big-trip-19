import Observable from '../framework/observable.js';

import { getRandomPoint } from '../mock/points.js';


const POINT_NUMBER = 4;

export default class TripPointModel extends Observable {
  #points = Array.from({ length: POINT_NUMBER }, getRandomPoint);

  get points() {
    return this.#points;
  }

  updateWaypoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update nonexistent point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete nonexistent point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}

