const { login } = require('./discordClient');
const createServer = require('./server');

async function main() {
  await login();
  createServer();
}

main().catch(err => {
  console.error('Fatal error starting FW-Notifier', err);
  process.exit(1);
});