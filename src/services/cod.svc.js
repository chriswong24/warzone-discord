const codApi = require('call-of-duty-api')();
const axios = require('axios');
const constants = require('../constants/constants.js');
const sortBy = require('lodash/sortBy'); 

async function login() {
  try {
    await codApi.login(process.env.COD_USERNAME, process.env.COD_PASSWORD);
    console.log('Successfully logged into COD Api');
  } catch (err) {
    console.log(`Unable to login to COD Api: ${err}`);
  }
}

async function weeklyStats(gamertag, platform) {
  try {
    const weeklyData = await codApi.MWweeklystats(gamertag, platform);
    const filteredWeeklyStats = _filterWeeklyStats(weeklyData.wz.mode);
    return _generateWeeklyStatsString(filteredWeeklyStats);
  } catch (err) {
    console.log(`Unable to fetch weekly data: ${err}`);
    return 'There was an error fetching weekly data';
  }
}

function _filterWeeklyStats(weeklyStats) {
  let filteredWeeklyStats = [];
  for (key in weeklyStats) {
    filteredWeeklyStats.push(Object.assign({mode: key}, _filterWeeklyCategory(weeklyStats[key])));
  }
  filteredWeeklyStats = sortBy(filteredWeeklyStats, (weeklyStat) => {
    return constants.gameModePrecedence[weeklyStat.mode];
  });
  return filteredWeeklyStats;
}

function _filterWeeklyCategory(weeklyCategory) {
  return {
    kills: weeklyCategory.properties.kills,
    deaths: weeklyCategory.properties.deaths,
    kdRatio: weeklyCategory.properties.kdRatio.toFixed(2),
    damageDone: weeklyCategory.properties.damageDone,
    damageTaken: weeklyCategory.properties.damageTaken,
    gulagRatio: ((weeklyCategory.properties.gulagKills / 
                (weeklyCategory.properties.gulagDeaths + weeklyCategory.properties.gulagKills)) *
                100.0).toFixed(2),
    matchesPlayed: weeklyCategory.properties.matchesPlayed,
  }
}

function _generateWeeklyStatsString(weeklyStats) {
  let weeklyStatsString = '';
  weeklyStats.forEach((category) => {
    weeklyStatsString += `
# ${constants.gameModes[category.mode]} #
Kills: ${category.kills}
Deaths: ${category.deaths}
K/D: ${category.kdRatio}
Damage Done: ${category.damageDone}
Damage Taken: ${category.damageTaken}
Gulag Win Rate: ${category.gulagRatio}%
Matches Played: ${category.matchesPlayed}
`
  });
  return `\`\`\`markdown
${weeklyStatsString}
\`\`\``;
}

/**
 * Returns team info
 *
 */
async function matchData(gamertag, platform) {
  try {
    const personalMatchData = await codApi.MWcombatwz(gamertag, platform); 
    const latestMatch = personalMatchData.matches[0];
    const teamID = latestMatch.player.team;
    const matchID = latestMatch.matchID;
    const endTimeString = _generateDateString(latestMatch.utcEndSeconds);
    const gameMode = constants.gameModes[latestMatch.mode];
    const placement = _appendOrdinalSuffix(latestMatch.playerStats.teamPlacement);

    const codMatchDataUrl = `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchID}/it`
    const matchData = await axios.get(codMatchDataUrl);
    const completeTeamData = matchData.data.data.allPlayers.filter((individual) => individual.player.team === teamID);

    const filteredTeamData = _filterTeamData(completeTeamData);
    return _generateMatchDataString(filteredTeamData, endTimeString, gameMode, placement);

  } catch (err) {
    console.log(`Unable to fetch match data for ${gamertag}[${platform}] - ${err}`);
    return 'There was an error fetching match data!';
  }
}

// We only need player.clantag, player.username, playerStats.kills, playerStats.deaths, playerStats 
function _filterTeamData(completeTeamData) {
  return completeTeamData.map((playerObject) => ({
    username: playerObject.player.username,
    clantag: playerObject.player.clantag ? `[${playerObject.player.clantag}]`: '',
    kills: playerObject.playerStats.kills,
    deaths: playerObject.playerStats.deaths,
    damageDone: playerObject.playerStats.damageDone,
    damageTaken: playerObject.playerStats.damageTaken,
  }));
}

function _generateMatchDataString(filteredTeamData, endTimeString, gameMode, placement) {
  const titleString = `${gameMode} - ${endTimeString}`
  const titleDivider = '='.repeat(titleString.length);
  const placementString = `Placement: ${placement}`;
  let userGameDataString = '';

  filteredTeamData.forEach((data) => {
    userGameDataString += `# [${data.clantag}] ${data.username} #
Kills: ${data.kills}
Deaths: ${data.deaths}
Damage Done: ${data.damageDone}
Damage Taken: ${data.damageTaken}
`;
  });
  return `\`\`\`markdown
${titleString}
${titleDivider}

${placementString}
  
${userGameDataString}
\`\`\`
`
}

function _generateDateString(utcSeconds) {
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'});
}

// Taken from stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function _appendOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j == 1 && k != 11) {
    return `${num}st`;
  }
  if (j == 2 && k != 12) {
    return `${num}nd`;
  }
  if (j == 3 && k != 13) {
    return `${num}rd`;
  }
  return `${num}th`;
}

module.exports = {
  login,
  matchData,
  weeklyStats,
}
