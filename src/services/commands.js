const codService = require('./cod.svc.js');
const UserMap = require('./user-map.svc.js');
const constants = require('../constants/constants.js');

function CommandRouter() {
  this.userMap = new UserMap();
  codService.login();
  this.commandMap = new Map();
  this.commandMap.set('help', _help);
  this.commandMap.set('test', this._test);
  this.commandMap.set('dub', _dub);
  this.commandMap.set('register', _register.bind(this));
  this.commandMap.set('stats', _stats.bind(this));
  this.commandMap.set('latest', _latest.bind(this));
}
  

// Routes specific command to appropriate function
CommandRouter.prototype.getCommandMessage = function(command, author, args) {
  if (!this.commandMap.get(command)) {
    return `${command} is not a valid command! Use !pew help to see all available commands`
  } else {
    return this.commandMap.get(command)(author, args);
  }
}

function _help(author, args) {
  return `**!pew help** - list commands

  **!pew register <username> <platform>** - register username to specific discord user
   - You will need to do this in order to fetch stats for yourself
   - platform <xbox/psn/pc>

  **!pew latest** - fetches stats from most recent game

  **!pew weekly** - fetches weekly stats

  **!pew TODO** - MORE COMMANDS
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
    return `Invalid usage of !pew register. You need to supply the full username and platform
            !pew register <username> <xbox|psn|pc>`
  }
  return this.userMap.registerUser(author, args[0], args[1]) ? 
    `Successfully linked ${author} to ${args[0]} on ${args[1]}` :
    `Unable to link ${author} to COD account!`;
}

CommandRouter.prototype._resolveAfter5Seconds = function(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 5000);
  });
}


CommandRouter.prototype._test = async function(author, args) {
  return await this._resolveAfter5Seconds('Hello!');
}

/**
 * This would be something along the lines of...
 * 
 */
async function _stats(author, args) {
  // fetch user 
}

async function _latest(author, args) {
  
}

/**
 * Spits out two random guns to use
 */
function _loadout(author, args) {

}

module.exports = CommandRouter;
