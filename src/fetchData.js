const fetch = require('node-fetch');
const { find } = require('lodash');

const TRACKER_API = 'https://public-api.tracker.gg/v2/valorant/standard/profile/riot';

const fetchData = async (username) => {
  const res = await fetch(`${TRACKER_API}/${username.replace('#', '%23')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'TRN-Api-Key': process.env.TRACKERGG_API_KEY,
    },
  });

  if (res.ok) {
    const json = await res.json();
    const data = find(json.data.segments, ({ attributes }) => (attributes.key = 'competative'));

    if (data) {
      const { stats } = data;

      console.log('asdfasdf', stats.rank);

      return {
        username: json.data.platformInfo.platformUserHandle,
        timePlayed: stats.timePlayed.displayValue,
        totalMatches: stats.matchesPlayed.value,
        wins: stats.matchesWon.value,
        losses: stats.matchesLost.value,
        winLossPct: stats.matchesWinPct.value,
        scorePerRound: stats.scorePerRound.value,
        kills: stats.kills.value,
        killsPerRound: stats.killsPerRound.value,
        deaths: stats.deaths.value,
        assists: stats.assists.value,
        kdr: stats.kDRatio.value,
        rank: stats.rank.displayValue || stats.rank.metadata.tierName,
      };
    }
  }

  return {};
};

module.exports = fetchData;
