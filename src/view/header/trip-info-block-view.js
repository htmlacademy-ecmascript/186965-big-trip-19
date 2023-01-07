import AbstractView from '../../framework/view/abstract-view.js';

const createTripMainInfoBlockTemplate = () => '<section class="trip-main__trip-info  trip-info"></section';


export default class NewTripMainInfoBlockView extends AbstractView {
  get template() {
    return createTripMainInfoBlockTemplate();
  }

}
