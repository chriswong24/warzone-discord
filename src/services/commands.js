const codService = require('./cod-service.js');

function help(message) {
  const helpMsg = 
  `Pew Pew Bot Commands:
   !pew help                            - list commands
   !pew register <username> <platform>  - register username to specific discord user
     - You will need to do this in order to fetch stats for yourself
     - platform <xbox/psn/pc>


   !pew latest                          - fetches stats from most recent game
   !pew weekly                          - fetches weekly stats
   !pew TODO                            - MORE COMMANDS

  ` 


  message.channel.send(helpMsg);
}

function resolveAfter5Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 5000);
  });
}

function initializeUsers() {

}

// For now this is just stored in a text file
// <discord_username>|cod name|platform
function registerUser(username) {

}


async function test(message) {
  if (message.content === 'ping'){
    message.channel.send('pong');
  } else if (message.content === 'Pee Pee') {
    message.channel.send('Poo Poo');
  } else {
    const x = await resolveAfter5Seconds('IDK');
    message.channel.send(x);
  }
}

function latest(message) {
  // get latest match stats
  //
}

let commands = new Map()
commands.set('test', test);

module.exports = commands;
