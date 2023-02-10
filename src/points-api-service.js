import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class PointApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }


  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null, // На сервере дата хранится в ISO формате
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,

    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;


    return adaptedPoint;
  }
}
