require('dotenv').config();
const { isEmpty } = require('lodash');
const { Client } = require('discord.js');
const client = new Client();

const buildMessage = require('./buildMessage.js');
const fetchData = require('./fetchData.js');

const PREFIX = '!val';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX) || message.content.trim().length < 5) return;
  const username = encodeURI(message.content.trim().substring(PREFIX.length + 1));

  const data = await fetchData(username);

  if (isEmpty(data)) {
    const reply = buildMessage({
      command: 'User Not Found',
      username,
      desc: `The user ${username} could not be found.`,
    });
    message.channel.send(reply);
    return;
  }

  const reply = buildMessage({ command: 'stats', data });
  message.channel.send(reply);
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
