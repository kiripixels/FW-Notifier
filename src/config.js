require('dotenv').config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  channelId: process.env.DISCORD_CHANNEL_ID,
  port: process.env.PORT || 9674,
  webhookSlug: process.env.WEBHOOK_SLUG || '/api/v1.0/fourthwall',
  webhookSecret: process.env.WEBHOOK_SECRET || '',
  brandName: process.env.BRAND_NAME || 'FW-Notifier',
  brandColor: process.env.BRAND_COLOR || '#5865F2',
  brandIconUrl: process.env.BRAND_ICON_URL || '',

  botStatus: process.env.BOT_STATUS || 'online',
  botActivityType: process.env.BOT_ACTIVITY_TYPE || 'Watching',
  botActivityText: process.env.BOT_ACTIVITY_TEXT || 'Fourthwall Orders'
};