import Observable from '../framework/observable.js';

import { getRandomPoint } from '../mock/points.js';


const POINT_NUMBER = 4;

export default class TripPointModel extends Observable {
  #points = Array.from({ length: POINT_NUMBER }, getRandomPoint);

  get points() {
    return this.#points;
  }
}

