import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';


export default class TripPointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({ pointsApiService }) {
    super();

    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.points.then((points) => {
    //   console.log(points.map(this.#adaptToClient));
    // });
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (error) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateWaypoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update nonexistent point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
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

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'], // На клиенте дата хранится как экземпляр Date
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}

