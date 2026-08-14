const express = require('express');
const config = require('./config');
const handlers = require('./handlers');
const { getChannel } = require('./discordClient');

function createServer() {
  const app = express();
  app.use(express.json());

  function checkSecret(req, res) {
    if (config.webhookSecret) {
      const provided = req.header('X-Webhook-Secret');
      if (provided !== config.webhookSecret) {
        res.status(401).json({ error: 'Unauthorized' });
        return false;
      }
    }
    return true;
  }

  async function handleEvent(type, data, res) {
    const handler = handlers[type];

    if (!handler) {
      return res.status(400).json({ error: `Unsupported type: ${type}` });
    }

    try {
      const embed = handler(data || {});
      const channel = getChannel();

      if (!channel) {
        console.error('Target channel not ready');
        return res.status(503).json({ error: 'Channel not ready' });
      }

      await channel.send({ embeds: [embed] });
      res.status(200).json({ status: 'ok' });
    } catch (err) {
      console.error('Failed to process webhook', err);
      res.status(500).json({ error: 'Internal error' });
    }
  }

  app.post(config.webhookSlug, async (req, res) => {
    if (!checkSecret(req, res)) return;
    const payload = req.body;
    await handleEvent(payload && payload.type, payload && payload.data, res);
  });

  app.post(`${config.webhookSlug}/:type`, async (req, res) => {
    if (!checkSecret(req, res)) return;
    const payload = req.body;
    const type = req.params.type;
    await handleEvent(type, payload && payload.data, res);
  });

  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

  app.listen(config.port, () => {
    console.log(`Webhook server listening on port ${config.port}`);
    console.log(`Endpoint: POST ${config.webhookSlug}`);
    console.log(`Endpoint: POST ${config.webhookSlug}/:type (e.g. ${config.webhookSlug}/ORDER_PLACED)`);
  });

  return app;
}

module.exports = createServer;