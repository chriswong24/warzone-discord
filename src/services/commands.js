const codService = require('./cod.svc.js');
const UserMap = require('./user-map.svc.js');
const constants = require('../constants/constants.js');

function CommandRouter() {
  this.userMap = new UserMap();
  this.commandMap = new Map();
  this.commandMap.set('help', _help);
  this.commandMap.set('test', this._test);
  this.commandMap.set('dub', _dub);
  this.commandMap.set('register', _register.bind(this));
  this.commandMap.set('latest', _latest.bind(this));
}
  

// Routes specific command to appropriate function
CommandRouter.prototype.getCommandMessage = function(author, command, args) {
  if (!this.commandMap.get(command)) {
    return `${command} is not a valid command! Use !pew help to see all available commands`
  } else {
    return this.commandMap.get(command)(author, args);
  }
}

function _help(author, args) {
  return `\`\`\`
!pew help - list commands

!pew register <username> <platform> - register username to specific discord user
  - You will need to do this in order to fetch stats for yourself
  - platform <xbl/psn/battle/steam/acti>

!pew latest <username?> <platform?> - fetches stats from most recent game. Defaults to registered user / platform if arguments aren't supplied

!pew drop <square/location> - generates random square / location to drop at

!pew weekly - TODO

!pew TODO - MORE STUFF 
\`\`\`
`  
}


/**
 * Interacts with Rhythm Bot to play that scooby doo!
 */
function _dub(author, args) {
  return `!play https://www.youtube.com/watch?v=3Fzi4lBzqIgls`; 
}

/**
 * Registers user 
  * discord_username|li
 */
function _register(author, args) {
  if (args.length != 2) {
    return `Error: Invalid usage of !pew register. You need to supply the full username and platform

  !pew register <username> <xbox|psn|pc>`
  }
  return this.userMap.registerUser(author, args[0], args[1]) ? 
    `Successfully linked ${author} to ${args[0]} on ${args[1]}` :
    `Unable to link ${author} to COD account!`;
}

// !pew latest <gamertag>? <platform>?
//  defaults to use registered if no arguments are supplied
async function _latest(author, args) {
  let gamertag = '';
  let platform = '';
  // user supplied gamertag and platform manually
  if (args.length === 2) {
    gamertag = args[0];
    platform = args[1];
  } else {
    const userInfo = this.userMap.getUser(author);
    if (!userInfo) {
      return `Please use !pew register <gamertag> <platform> 
          or
          !pew latest <gamertag> <platform>
        `;
    }
    gamertag = userInfo.gamertag;
    platform = userInfo.platform;
  }

  return await codService.matchData(gamertag, platform);
}
/*
  const matchData = await codService.matchData(gamertag, platform); 
  if (!matchData) {
    return `Unable to fetch match data for ${gamertag}[${platform}]`;
  } else {
    return _generateMatchDataString(matchData);
  }
}

function _generateMatchDataString(matchData) {
  try {
    const latestMatch = matchData.matches[0];
    const startTime = _getDateString(latestMatch.utcStartSeconds);
    const endTime = _getDateString(latestMatch.utcEndSeconds);
    const teamPlacement = constants.gameModes[matchData.mode];
    const test =

    return 
  } catch (err) {
    console.log(`Parsing issue while generating match data string: ${err}`;
    return `Unable to fetch match data for ${gamertag}[${platform}]`;
  }
}

function _getDateString(utcStartSeconds) {
  const date = new Date(0);
  date.setUTCSeconds(utcStartSeconds);
  return date.toLocaleString();
}
*/


/**
 * Spits out two random guns to use
 */
function _loadout(author, args) {

}

module.exports = CommandRouter;
