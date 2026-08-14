const { baseEmbed } = require('../utils/embeds');
const { truncateEmail } = require('../utils/format');

function buildNewsletterSubscribedEmbed(data) {
  return baseEmbed()
    .setTitle('📧 Newsletter Signup')
    .addFields({ name: 'Email', value: truncateEmail(data.email) || 'Unknown' });
}

module.exports = buildNewsletterSubscribedEmbed;