const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const token = fs.readFileSync('server/token.txt').toString();
const codApi = require('src/services/cod.svc.js');
const CommandRouter = require('src/services/commands.js');

client.login(token);

client.on('ready', async () => {
  console.info(`Logged in as ${client.user.tag}!`);
  await codApi.login();
});

const commandRouter = new CommandRouter();

client.on('message', async (message) => {
  if (!message.author.bot && message.content.startsWith('!pew')) {
    const messageArgs = message.content.split(' ').slice(1);
    const command = messageArgs[0];
    const args = messageArgs.slice(1);
    const author = message.author.username;
    const msg = await commandRouter.getCommandMessage(author, command, args);
    message.channel.send(msg);
  }
});
