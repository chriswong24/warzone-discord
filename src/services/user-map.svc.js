const fs = require('fs');

/**
 * userMap: {"discordUsername": {"gamertag": "username", "platform": "platform"}}
 */
function UserMap() {
  this.userMap = this._intializeUserMap();
}


UserMap.prototype._intializeUserMap = function() {
  try {
    return JSON.parse(fs.readFileSync('src/data/user-map.json', 'utf8'));
  } catch (err) {
    console.log(`Error: Unable to read user-map.json: ${err}`);
    return {};
  }
}

UserMap.prototype.saveUserMap = function() {
  try {
    fs.writeFile('src/data/user-map.json', JSON.stringify(this.userMap));
    return true;
  } catch (err) {
    console.log('Unable to write to user-map file');
    return false;
  }
}

/**
 * Add user to cached user map object and also write to json file.
 */
UserMap.prototype.registerUser = function(discordUsername, gamertag, platform) {
  this.userMap[discordUsername] = {'gamertag': gamertag, 'platform': platform};
  return this.saveUserMap();
}

/**
 * @param discordUsername - users discord name
 * @return Object with gamertag and platform {gamertag: "gamertag", platform "platform"}
 */
UserMap.prototype.getUser = function(discordUsername) {
  return this.userMap[discordUsername];
}

module.exports = UserMap;

/**
 * Functions:
 *  - Read file
 *  - Write file
 *  - Register user
 *  - Get user cod name and platform
 */
