const { baseEmbed } = require('../utils/embeds');
const { formatMoney, last, truncateEmail } = require('../utils/format');

function buildOrderPlacedEmbed(data) {
  const embed = baseEmbed()
    .setTitle('🛒 New Order Placed')
    .addFields(
      { name: 'Order #', value: `...${last(data.friendlyId, 3)}`, inline: true },
      { name: 'Customer', value: data.username || truncateEmail(data.email) || 'Unknown', inline: true }
    );

  if (data.message) {
    embed.addFields({ name: 'Message', value: data.message });
  }

  if (Array.isArray(data.offers) && data.offers.length > 0) {
    const itemsText = data.offers.map(offer => {
      const variant = offer.variant || {};
      const qty = variant.quantity ?? 1;
      const price = formatMoney(variant.price || variant.unitPrice);
      const desc = variant.attributes && variant.attributes.description
        ? ` (${variant.attributes.description})`
        : '';
      return `${qty}x ${offer.name}${desc} - ${price || 'N/A'}`;
    }).join('\n');

    embed.addFields({ name: 'Items', value: itemsText });
  }

  const amounts = data.amounts || {};
  const totalsLines = [];

  if (amounts.subtotal) totalsLines.push(`Subtotal: ${formatMoney(amounts.subtotal)}`);
  if (amounts.shipping) totalsLines.push(`Shipping: ${formatMoney(amounts.shipping)}`);
  if (amounts.tax) totalsLines.push(`Tax: ${formatMoney(amounts.tax)}`);
  if (amounts.discount && amounts.discount.value > 0) {
    totalsLines.push(`Discount: -${formatMoney(amounts.discount)}`);
  }
  if (amounts.donation && amounts.donation.value > 0) {
    totalsLines.push(`Donation: ${formatMoney(amounts.donation)}`);
  }
  if (amounts.total) totalsLines.push(`**Total: ${formatMoney(amounts.total)}**`);

  if (totalsLines.length > 0) {
    embed.addFields({ name: 'Totals', value: totalsLines.join('\n') });
  }

  if (Array.isArray(amounts.giftCards) && amounts.giftCards.length > 0) {
    const giftText = amounts.giftCards
      .map(gc => `****${last(gc.code, 4)} - ${formatMoney(gc.amountUsed)}`)
      .join('\n');
    embed.addFields({ name: 'Gift Cards Used', value: giftText });
  }

  return embed;
}

module.exports = buildOrderPlacedEmbed;