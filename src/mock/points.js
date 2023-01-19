
import { mockDestinations } from './destinations.js';
import { getRandomArrayElement } from '../utils/common.js';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    'basePrice': 10,
    'dateFrom': '2022-07-10T10:55:56.845Z',
    'dateTo': '2022-08-10T16:32:06.845Z',
    'destinationName': mockDestinations[0].name,
    'destination': mockDestinations[0].description,
    'isFavorite': true,
    'offers': [1, 5],
    'type': 'taxi'
  },
  {
    'basePrice': 20,
    'dateFrom': '2023-01-10T16:32:06.845Z',
    'dateTo': '2023-01-11T16:32:06.845Z',
    'destinationName': mockDestinations[1].name,
    'destination': mockDestinations[1].description,
    'isFavorite': false,
    'offers': [1, 5, 3],
    'type': 'bus'
  },
  {
    'basePrice': 30,
    'dateFrom': '2023-02-10T16:32:06.845Z',
    'dateTo': '2023-02-11T16:32:06.845Z',
    'destinationName': mockDestinations[2].name,
    'destination': mockDestinations[2].description,
    'isFavorite': true,
    'offers': [1, 2, 3, 4, 5],
    'type': 'train'
  },
  {
    'basePrice': 40,
    'dateFrom': '2023-03-10T16:32:06.845Z',
    'dateTo': '2023-03-11T16:32:06.845Z',
    'destinationName': mockDestinations[3].name,
    'destination': mockDestinations[3].description,
    'isFavorite': false,
    'offers': [1, 2, 3, 4, 5],
    'type': 'ship'
  },
  {
    'basePrice': 50,
    'dateFrom': '2023-04-10T16:32:06.845Z',
    'dateTo': '2023-04-11T16:32:06.845Z',
    'destinationName': mockDestinations[4].name,
    'destination': mockDestinations[4].description,
    'isFavorite': false,
    'offers': [2, 3, 5],
    'type': 'drive'
  },
  {
    'basePrice': 60,
    'dateFrom': '2023-05-10T16:32:06.845Z',
    'dateTo': '2023-05-11T16:32:06.845Z',
    'destinationName': mockDestinations[0].name,
    'destination': mockDestinations[0].description,
    'isFavorite': false,
    'offers': [2, 3, 4, 5],
    'type': 'flight'
  },
  {
    'basePrice': 70,
    'dateFrom': '2023-06-10T16:32:06.845Z',
    'dateTo': '2023-06-11T16:32:06.845Z',
    'destinationName': mockDestinations[1].name,
    'destination': mockDestinations[1].description,
    'isFavorite': true,
    'offers': [2],
    'type': 'check-in'
  },
  {
    'basePrice': 80,
    'dateFrom': '2024-01-10T16:32:06.845Z',
    'dateTo': '2024-01-11T16:32:06.845Z',
    'destinationName': mockDestinations[2].name,
    'destination': mockDestinations[2].description,
    'isFavorite': false,
    'offers': [1, 2, 5],
    'type': 'sightseeing'
  },
  {
    'basePrice': 90,
    'dateFrom': '2024-02-10T16:32:06.845Z',
    'dateTo': '2024-02-11T16:32:06.845Z',
    'destinationName': mockDestinations[3].name,
    'destination': mockDestinations[3].description,
    'isFavorite': true,
    'offers': [2],
    'type': 'restaurant'
  },
];


const getRandomPoint = () => ({
  id: nanoid(),
  ...getRandomArrayElement(mockPoints)
});


export { getRandomPoint };

