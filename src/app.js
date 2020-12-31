require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client();

const buildMessage = require("./buildMessage.js");

const PREFIX = "!val";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(PREFIX) ||
    message.content.trim().length < 5
  )
    return;

  const [command, ...usernames] = message.content
    .trim()
    .substring(PREFIX.length)
    .match(/[^ ]+/g);

  if (usernames.length > 0) {
    usernames.forEach(async (username) => {
      const reply = buildMessage({ command, username });
      message.channel.send(reply);
    });
  } else {
    console.log("HAS NO ARGS");

    const reply = buildMessage({ command: "Stats", username: command });
    message.channel.send(reply);
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
