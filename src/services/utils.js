const constants = require('../constants/constants.js');

function getSeasonTimes(requestedSeason) {
  let start = 0;
  let end = 0;
  switch(requestedSeason) {
    case 1:
      start = constants.seasonEpochTimestamps['season1Start'];
      end = constants.seasonEpochTimestamps['season1End'];
      break;
    case 2:
      start = constants.seasonEpochTimestamps['season2Start'];
      end = constants.seasonEpochTimestamps['season2End'];
      break;
    default:
      return null;
  }

  return {startTime: start, endTime: end};
}

module.exports = {
  getSeasonTimes
}
