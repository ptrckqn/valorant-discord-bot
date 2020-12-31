require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

const PREFIX = '!val';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const username = message.content.trim().substring(PREFIX.length).split(/\s+/)[1];

  console.log('username', username);
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
