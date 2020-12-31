require("dotenv").config();
const { isEmpty } = require("lodash");
const { Client } = require("discord.js");
const client = new Client();

const buildMessage = require("./buildMessage.js");
const fetchData = require("./fetchData.js");

const PREFIX = "!val";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
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

  if (!isEmpty(usernames.length)) {
    usernames.forEach(async (username) => {
      const reply = buildMessage({ command, username });
      message.channel.send(reply);
    });
  } else {
    const data = await fetchData(command);

    if (isEmpty(data)) {
      const reply = buildMessage({
        command: "User Not Found",
        username: command,
        desc: `The user ${command} could not be found.`,
      });
      message.channel.send(reply);
      return;
    }

    const reply = buildMessage({ command: "stats", data });
    message.channel.send(reply);
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
