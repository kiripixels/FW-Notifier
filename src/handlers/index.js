const buildOrderPlacedEmbed = require('./orderPlaced');
const buildOrderUpdatedEmbed = require('./orderUpdated');
const buildDonationEmbed = require('./donation');
const buildSubscriptionPurchasedEmbed = require('./subscriptionPurchased');
const buildSubscriptionExpiredEmbed = require('./subscriptionExpired');
const buildSubscriptionChangedEmbed = require('./subscriptionChanged');
const buildNewsletterSubscribedEmbed = require('./newsletterSubscribed');

module.exports = {
  ORDER_PLACED: buildOrderPlacedEmbed,
  ORDER_UPDATED: buildOrderUpdatedEmbed,
  DONATION: buildDonationEmbed,
  SUBSCRIPTION_PURCHASED: buildSubscriptionPurchasedEmbed,
  SUBSCRIPTION_EXPIRED: buildSubscriptionExpiredEmbed,
  SUBSCRIPTION_CHANGED: buildSubscriptionChangedEmbed,
  NEWSLETTER_SUBSCRIBED: buildNewsletterSubscribedEmbed
};