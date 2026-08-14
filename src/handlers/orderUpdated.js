const { baseEmbed } = require('../utils/embeds');

function buildOrderUpdatedEmbed(data) {
  const updateType = (data.update && data.update.type) || 'Unknown';

  return baseEmbed()
    .setTitle('📦 Order Updated')
    .addFields({ name: 'Update Type', value: updateType });
}

module.exports = buildOrderUpdatedEmbed;