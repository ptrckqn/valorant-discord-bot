const Discord = require("discord.js");

const REPO_URL = "https://github.com/ptrckqn/valorant-discord-bot/";
const LOGO_URL =
  "https://github.com/ptrckqn/valorant-discord-bot/blob/main/assets/valorant-logo.png?raw=true";

const buildMessage = ({ command, username }) => {
  const msg = new Discord.MessageEmbed()
    .setColor("#ff4655")
    .setAuthor(command, LOGO_URL, REPO_URL)
    .setURL(REPO_URL)
    .setTitle(username)
    .setThumbnail("");

  return msg;
};

module.exports = buildMessage;
