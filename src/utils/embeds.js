const { EmbedBuilder } = require('discord.js');
const config = require('../config');

function baseEmbed() {
  const embed = new EmbedBuilder()
    .setColor(config.brandColor)
    .setFooter({
      text: config.brandName,
      iconURL: config.brandIconUrl || undefined
    })
    .setTimestamp();

  return embed;
}

module.exports = { baseEmbed };