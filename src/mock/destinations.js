import { getRandomNumber } from '../utils.js';

export const mockDestinations = [
  {
    'id': 1,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Chamonix parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'id': 2,
    'description': 'Amsterdam is the capital and most populous city of the Netherlands, with The Hague being the seat of government.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Amsterdam parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Amsterdam parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Amsterdam parliament building'
      }
    ]
  },
  {
    'id': 3,
    'description': 'Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. ',
    'name': 'Geneva',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Geneva parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Genevaparliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Genevaparliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Geneva parliament building'
      }
    ]
  },
  {
    'id': 4,
    'description': 'London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.',
    'name': 'London',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'London parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'London parliament building'
      }
    ]
  },
  {
    'id': 5,
    'description': 'Boston officially the City of Boston, is the state capital and most populous city of the Commonwealth of Massachusetts, as well as the cultural and financial center of the New England region of the United States.',
    'name': 'Boston',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Boston parliament building'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        'description': 'Boston parliament building'
      }
    ]
  }
];
