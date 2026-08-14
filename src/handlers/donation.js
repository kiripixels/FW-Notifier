const { baseEmbed } = require('../utils/embeds');
const { formatMoney, truncateEmail } = require('../utils/format');

function buildDonationEmbed(data) {
  const embed = baseEmbed()
    .setTitle('💖 New Donation')
    .addFields(
      { name: 'From', value: data.username || truncateEmail(data.email) || 'Anonymous', inline: true },
      { name: 'Amount', value: formatMoney(data.amounts && data.amounts.total) || 'N/A', inline: true }
    );

  if (data.message) {
    embed.addFields({ name: 'Message', value: data.message });
  }

  return embed;
}

module.exports = buildDonationEmbed;