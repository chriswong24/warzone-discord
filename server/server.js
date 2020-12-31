const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const token = fs.readFileSync('server/token.txt').toString();
const CommandRouter = require('src/services/commands.js');

client.login(token);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.bot && message.content.startsWith('!pew')) {
    // !pew <command> args
    // !pew stats (user) (platform)
    // !pew weekly (user) (platform)
    const messageArgs = message.content.split(' ').slice(1);
    const command = messageArgs[0];
    const args = messageArgs.slice(1);
    const commandRouter = new CommandRouter();
    const author = message.author.username;
    message.channel.send(commandRouter.getCommandMessage(command, author, args));
  }
});
