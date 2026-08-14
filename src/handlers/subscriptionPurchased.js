const { baseEmbed } = require('../utils/embeds');
const { formatMoney, truncateEmail } = require('../utils/format');

function buildSubscriptionPurchasedEmbed(data) {
  const variant = (data.subscription && data.subscription.variant) || {};

  return baseEmbed()
    .setTitle('🎉 New Subscription')
    .addFields(
      { name: 'Username', value: data.nickname || truncateEmail(data.email) || 'Unknown', inline: true },
      { name: 'Tier', value: variant.tierId || 'N/A', inline: true },
      { name: 'Amount', value: formatMoney(variant.amount) || 'N/A', inline: true }
    );
}

module.exports = buildSubscriptionPurchasedEmbed;