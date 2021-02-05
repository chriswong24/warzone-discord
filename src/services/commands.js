const codService = require('./cod.svc.js');
const UserMap = require('./user-map.svc.js');
const constants = require('../constants/constants.js');

function CommandRouter() {
  this.userMap = new UserMap();
  this.commandMap = new Map();
  this.commandMap.set('help', _help);
  this.commandMap.set('register', _register.bind(this));
  this.commandMap.set('latest', _latest.bind(this));
  this.commandMap.set('weekly', _weekly.bind(this));
  this.commandMap.set('drop', _drop);
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
  const msg = `\`\`\`
!pew help - list commands

!pew register <username> <platform> - register username to specific discord user
  - You'll need to make your profile public in order for the api to fetch stats
    - https://cod.tracker.gg/cold-war/articles/how-to-public-stats 
  - You will need to do this in order to fetch stats for yourself
  - platform <xbl/psn/battle/steam/acti>

!pew latest <username?> <platform?> - fetches stats from most recent game. Defaults to registered user / platform if arguments aren't supplied

!pew weekly <username?> <platform?> 

!pew drop - lists random location to drop at 

!pew loadout - [WIP] generates two random guns to throw in a loadout. Assumes overkill 
\`\`\`
`  
  return {msg}
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
  let msg;
  if (args.length != 2) {
    msg = `Error: Invalid usage of !pew register. You need to supply the full username and platform

  !pew register <username> <xbox|psn|battle>`
  } else {
    msg = this.userMap.registerUser(author, args[0], args[1]) ? 
    `Successfully linked ${author} to ${args[0]} on ${args[1]}` :
    `Unable to link ${author} to COD account!`;
  }
  return {msg}
}

// !pew latest <gamertag>? <platform>?
//  defaults to use registered if no arguments are supplied
async function _latest(author, args) {
  let userInfo = {}; 
  if (!_getUserInfo.call(this, author, args, userInfo)) {
    return {msg: `Please use !pew register <gamertag> <platform> to set up your profile 
or
!pew latest <gamertag> <platform>`};
  }
  const msg = await codService.matchData(userInfo.gamertag, userInfo.platform);
  return {msg}
}

async function _weekly(author, args) {
  let userInfo = {}; 
  if (!_getUserInfo.call(this, author, args, userInfo)) {
    return `Please use !pew register <gamertag> <platform> to set up your profile 
or
!pew weekly <gamertag> <platform>`;
  }
  const msg = await codService.weeklyStats(userInfo.gamertag, userInfo.platform);
  return {msg}
}

function _getUserInfo(author, args, userInfo) {
  if (args.length == 2) {
    userInfo.gamertag = args[0];
    userInfo.platform = args[1];
    return true;
  } else {
    const cachedUserInfo = this.userMap.getUser(author);
    if (cachedUserInfo) {
      userInfo.gamertag = cachedUserInfo.gamertag;
      userInfo.platform = cachedUserInfo.platform;
    }
    return !!cachedUserInfo;
  }
}

function _drop(author, args) {
  const randomDropZone = randomElementFromArray(constants.dropZones)
  return {msg: randomDropZone.name, options: {files: [randomDropZone.image]}}
}

function randomElementFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Spits out two random guns to use
 */
function _loadout(author, args) {

}

module.exports = CommandRouter;
