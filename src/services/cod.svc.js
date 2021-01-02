const codApi = require('call-of-duty-api')();
const axios = require('axios');
const constants = require('../constants/constants.js');
const loginInfo = require('../constants/login-info.js');

async function login() {
  try {
    await codApi.login(loginInfo.username, loginInfo.password);
    console.log('Successfully logged into COD Api');
  } catch (err) {
    console.log(`Unable to login to COD Api: ${err}`);
  }
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

    const codMatchDataUrl = `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchID}/it`
    const matchData = await axios.get(codMatchDataUrl);
    const completeTeamData = matchData.data.data.allPlayers.filter((individual) => individual.player.team === teamID);

    const filteredTeamData = _filterTeamData(completeTeamData);
    return _generateMatchDataString(filteredTeamData, endTimeString, gameMode);

  } catch (err) {
    console.log(`Unable to fetch match data for ${gamertag}[${platform}] - ${err}`);
    return 'There was an error fetching match data!';
  }
}

// We only need player.clantag, player.username, playerStats.kills, playerStats.deaths, playerStats 
function _filterTeamData(completeTeamData) {
  return completeTeamData.map((playerObject) => ({
    username: playerObject.player.username,
    clantag: playerObject.player.clantag,
    kills: playerObject.playerStats.kills,
    deaths: playerObject.playerStats.deaths,
    damageDone: playerObject.playerStats.damageDone,
    damageTaken: playerObject.playerStats.damageTaken,
  }));
}

function _generateMatchDataString(filteredTeamData, endTimeString, gameMode) {
  const titleString = `${gameMode} ${endTimeString}`
  const titleDivider = '='.repeat(titleString.length);
  let userGameDataString = '';

  filteredTeamData.forEach((data) => {
    userGameDataString += `
# [${data.clantag}] ${data.username} #
Kills: ${data.kills}
Deaths: ${data.deaths}
Damage Done: ${data.damageDone}
Damage Taken: ${data.damageTaken}
`;
  });
  return `\`\`\`markdown
${titleString}
${titleDivider}
  
${userGameDataString}
\`\`\`
`
}

function _generateDateString(utcSeconds) {
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
}

module.exports = {
  login,
  matchData,
}
