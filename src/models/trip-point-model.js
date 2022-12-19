import { getRandomPoint } from '../mock/points.js';


const POINT_NUMBER = 4;

export default class TripPointModel {
  points = Array.from({ length: POINT_NUMBER }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}

