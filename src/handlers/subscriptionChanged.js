const { baseEmbed } = require('../utils/embeds');
const { formatMoney, truncateEmail } = require('../utils/format');

function buildSubscriptionChangedEmbed(data) {
  const variant = (data.subscription && data.subscription.variant) || {};

  return baseEmbed()
    .setTitle('🔄 Subscription Changed')
    .addFields(
      { name: 'Username', value: data.nickname || truncateEmail(data.email) || 'Unknown', inline: true },
      { name: 'New Tier', value: variant.tierId || 'N/A', inline: true },
      { name: 'New Amount', value: formatMoney(variant.amount) || 'N/A', inline: true }
    );
}

module.exports = buildSubscriptionChangedEmbed;