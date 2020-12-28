const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const token = fs.readFileSync('server/token.txt').toString();
const commands = require('src/services/commands.js');

client.login(token);

function parseMessage(message) {
  // message.content is the string representation of message
  
}

client.on('message', message => {
  if (!message.author.bot) {
    commands.get('test')(message); 
  }
});
