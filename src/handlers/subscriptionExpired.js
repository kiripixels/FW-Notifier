const { baseEmbed } = require('../utils/embeds');
const { truncateEmail } = require('../utils/format');

function buildSubscriptionExpiredEmbed(data) {
  return baseEmbed()
    .setTitle('⌛ Subscription Expired')
    .addFields(
      { name: 'Username', value: data.nickname || truncateEmail(data.email) || 'Unknown', inline: true }
    );
}

module.exports = buildSubscriptionExpiredEmbed;