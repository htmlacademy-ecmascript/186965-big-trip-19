import { filterWaypointValue } from '../utils/filter.js';

const generateFilter = (points) => Object.entries(filterWaypointValue).map(([filterName, filterPoints]) => ({
  name: filterName,
  count: filterPoints(points).length,
}));


export { generateFilter };
