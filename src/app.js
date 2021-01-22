require('dotenv').config();
const { isEmpty, startCase } = require('lodash');
const { Client } = require('discord.js');
const cron = require('cron');
const client = new Client();

const buildMessage = require('./buildMessage.js');
const fetchData = require('./fetchData.js');

const NINE_TO_FIVE_FRIENDS = '761704533972877342';
const THEY_RACE_ME_SO_HARD = '244925554275385345';

const PREFIX = '!';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);

  scheduledMove.start();
});

client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [command, ...args] = message.content.trim().substring(PREFIX.length).split(' ');

  if (command === 'val') {
    const username = encodeURI(args.join(' '));

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
  } else if (command === 'vibecheck') {
    const vibe = Math.floor(Math.random() * 101);
    let reply = `${message.author.username} is vibing at ${vibe}% efficiency.`;

    if (vibe === 100) {
      reply = `${message.author.username} is V I B I N G`;
    } else if (vibe === 69) {
      reply += ' :eyes:';
    } else if (vibe === 0) {
      reply = `${message.author.username} is all vibed out. It's been nice knowing you...`;

      const timeoutTime = Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000;

      setTimeout(() => {
        message.member.voice.setChannel(null);
      }, timeoutTime);
    }
    message.channel.send(reply);
  } else if (command === 'bombbitch') {
    const users = await getUsersInVoiceChat(message);
    const presentUsers = users.map(({ user }) => user.username);
    const selectedUser = presentUsers[Math.floor(Math.random() * presentUsers.length)];
    message.channel.send(`Congratulations ${selectedUser}, you're the bomb bitch!`);
  } else if (command === 'cuck') {
    const users = await getUsersInVoiceChat(message);
    const presentUsers = users.map(({ user }) => user.username);
    const selectedUser = presentUsers[Math.floor(Math.random() * presentUsers.length)];
    message.channel.send(`${selectedUser} is the biggest cuck here.`);
  } else if (command === 'coinflip') {
    const outcomes = ['Heads', 'Tails'];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    message.channel.send(outcome);
  } else if (command === 'rps') {
    const botChoices = ['rock', 'paper', 'scissors'];
    if (isEmpty(args) || !botChoices.includes(args[0]).toLowerCase()) return message.channel.send('Please select either `rock`, `paper`, or `scissors`');
    const userChoice = args[0].toLowerCase();
    const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];
    let userWon = false;
    let tie = false;

    if ((userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'paper' && botChoice === 'rock') || (userChoice === 'scissors' && botChoice === 'paper')) {
      userWon = true;
    } else if (userChoice === botChoice) {
      tie = true;
    }

    message.channel.send(`${startCase(botChoice)}! ${tie ? "It's a tie." : `You ${userWon ? 'win.' : 'lose.'}`}`);
  }
});

// Move users from channel to other channel at 5:00 mountain time
const scheduledMove = new cron.CronJob('00 00 * * *', async () => {
  const channel = await client.channels.fetch(NINE_TO_FIVE_FRIENDS);
  channel.members.forEach((member) => {
    member.voice.setChannel(THEY_RACE_ME_SO_HARD);
  });
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

const getUsersInVoiceChat = async (message) => {
  const voiceChannel = await client.channels.fetch(message.member.voice.channel.id);
  return voiceChannel.members;
};
