
import { mockDestinations } from './destinations.js';
import { getRandomArrayElement } from '../utils.js';

const mockPoints = [
  {
    'basePrice': 20,
    'timeFrom': '10:30',
    'timeTo': '11:00',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[0].name,
    'destination': mockDestinations[0].description,
    'id': '0',
    'isFavorite': true,
    'offers': [1, 5],
    'type': 'taxi'
  },
  {
    'basePrice': 160,
    'timeFrom': '12:25',
    'timeTo': '13:35',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[1].name,
    'destination': mockDestinations[1].description,
    'id': '0',
    'isFavorite': false,
    'offers': [1, 5, 3],
    'type': 'bus'
  },
  {
    'basePrice': 500,
    'timeFrom': '10:25',
    'timeTo': '13:00',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[2].name,
    'destination': mockDestinations[2].description,
    'id': '0',
    'isFavorite': true,
    'offers': [1, 2, 3, 4, 5],
    'type': 'train'
  },
  {
    'basePrice': 90,
    'timeFrom': '15:05',
    'timeTo': '16:45',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[3].name,
    'destination': mockDestinations[3].description,
    'id': '0',
    'isFavorite': false,
    'offers': [1, 2, 3, 4, 5],
    'type': 'ship'
  },
  {
    'basePrice': 160,
    'timeFrom': '14:30',
    'timeTo': '16:05',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[4].name,
    'destination': mockDestinations[4].description,
    'id': '0',
    'isFavorite': false,
    'offers': [2, 3, 5],
    'type': 'drive'
  },
  {
    'basePrice': 160,
    'timeFrom': '12:25',
    'timeTo': '13:35',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[0].name,
    'destination': mockDestinations[0].description,
    'id': '0',
    'isFavorite': false,
    'offers': [2, 3, 4, 5],
    'type': 'flight'
  },
  {
    'basePrice': 600,
    'timeFrom': '16:20',
    'timeTo': '17:00',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[1].name,
    'destination': mockDestinations[1].description,
    'id': '0',
    'isFavorite': true,
    'offers': [2],
    'type': 'check-in'
  },
  {
    'basePrice': 180,
    'timeFrom': '11:15 ',
    'timeTo': '12:15',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[2].name,
    'destination': mockDestinations[2].description,
    'id': '0',
    'isFavorite': false,
    'offers': [1, 2, 5],
    'type': 'sightseeing'
  },
  {
    'basePrice': 110,
    'timeFrom': '21:00',
    'timeTo': '22:00',
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destinationName': mockDestinations[3].name,
    'destination': mockDestinations[3].description,
    'id': '0',
    'isFavorite': true,
    'offers': [2],
    'type': 'restaurant'
  },
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);


export { getRandomPoint };

