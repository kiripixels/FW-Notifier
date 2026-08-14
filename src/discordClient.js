const { Client, GatewayIntentBits, ActivityType, PresenceUpdateStatus } = require('discord.js');
const config = require('./config');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let targetChannel = null;

const activityTypeMap = {
  playing: ActivityType.Playing,
  watching: ActivityType.Watching,
  listening: ActivityType.Listening,
  competing: ActivityType.Competing,
  streaming: ActivityType.Streaming,
  custom: ActivityType.Custom
};

const statusMap = {
  online: PresenceUpdateStatus.Online,
  idle: PresenceUpdateStatus.Idle,
  dnd: PresenceUpdateStatus.DoNotDisturb,
  invisible: PresenceUpdateStatus.Invisible
};

function applyPresence() {
  const status = statusMap[config.botStatus.toLowerCase()] || PresenceUpdateStatus.Online;
  const activityType = activityTypeMap[config.botActivityType.toLowerCase()] ?? ActivityType.Watching;

  client.user.setPresence({
    status,
    activities: config.botActivityText
      ? [{ name: config.botActivityText, type: activityType }]
      : []
  });
}

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  applyPresence();

  try {
    targetChannel = await client.channels.fetch(config.channelId);
  } catch (err) {
    console.error('Failed to fetch target channel', err);
  }
});

function getChannel() {
  return targetChannel;
}

function login() {
  return client.login(config.discordToken);
}

module.exports = { client, getChannel, login, applyPresence };