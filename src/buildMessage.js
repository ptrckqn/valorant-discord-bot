const Discord = require("discord.js");
const { kebabCase, startCase } = require("lodash");

const REPO_URL = "https://github.com/ptrckqn/valorant-discord-bot/";
const LOGO_URL =
  "https://github.com/ptrckqn/valorant-discord-bot/blob/main/assets/valorant-logo.png?raw=true";
const RANKS_BASE_URL =
  "https://github.com/ptrckqn/valorant-discord-bot/blob/main/assets/ranks";

const LINEBREAK = { name: "\u200B", value: "\u200B" };

const buildMessage = ({ command, data = {}, desc }) => {
  const {
    username,
    timePlayed,
    totalMatches,
    wins,
    losses,
    winLossPct,
    scorePerRound,
    kills,
    killsPerRound,
    deaths,
    assists,
    kdr,
    rank,
  } = data;

  const msg = new Discord.MessageEmbed()
    .setColor("#ff4655")
    .setAuthor(startCase(command), LOGO_URL, REPO_URL)
    .setTitle(username || "")
    .setThumbnail(`${RANKS_BASE_URL}/${kebabCase(rank)}.webp?raw=true`)
    .setTimestamp();

  if (desc) {
    msg.setDescription(desc);
  }

  if (command === "stats") {
    msg.addFields(
      { name: "Rank", value: rank },
      LINEBREAK,
      { name: "Matches", value: totalMatches, inline: true },
      { name: "Time Played", value: timePlayed, inline: true },
      { ...LINEBREAK, inline: true },
      { name: "Wins", value: wins, inline: true },
      { name: "Losses", value: losses, inline: true },
      { name: "Win %", value: winLossPct, inline: true },
      { name: "Kills", value: kills, inline: true },
      { name: "Deaths", value: deaths, inline: true },
      { name: "Assists", value: assists, inline: true },
      { name: "K/D Ratio", value: kdr, inline: true },
      { name: "Kills/Round", value: killsPerRound, inline: true },
      { name: "Score/Round", value: scorePerRound, inline: true }
    );
  }

  return msg;
};

module.exports = buildMessage;
