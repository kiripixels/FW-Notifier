# FW-Notifier

<p align="center">
  <strong>Fourthwall → Discord notifications, made simple.</strong>
</p>

<p align="center">
  A lightweight Node.js service that receives Fourthwall webhook events and delivers them to a Discord channel as rich embeds.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Discord.js-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License">
</p>

---

## ✨ Overview

**FW-Notifier** bridges Fourthwall and Discord.

When a supported Fourthwall event occurs, Fourthwall sends a webhook to FW-Notifier. The service processes the event, generates a Discord embed, and sends the notification directly to your configured Discord channel.

```text
┌──────────────┐
│   Fourthwall │
└──────┬───────┘
       │
       │ Webhook
       ▼
┌────────────────┐
│   FW-Notifier  │
│                │
│  Express API   │
│       +        │
│ Event Handlers │
└───────┬────────┘
        │
        │ Discord Embed
        ▼
┌────────────────┐
│    Discord     │
│                │
│  Notification  │
│    Channel     │
└────────────────┘
```

## 🚀 Features

* 🔔 **Fourthwall Webhooks** — Receive Fourthwall events through a simple HTTP endpoint.
* 💬 **Discord Notifications** — Send events directly to a Discord channel.
* 🎨 **Rich Embeds** — Event handlers can turn webhook data into formatted Discord embeds.
* 🔐 **Webhook Authentication** — Optional `X-Webhook-Secret` authentication.
* ⚡ **Lightweight** — Built with Node.js and Express with minimal overhead.
* 🩺 **Health Endpoint** — Built-in `/health` endpoint for monitoring.
* ⚙️ **Environment Configuration** — Configure the application entirely through `.env`.
* 🏷️ **Custom Branding** — Configure the bot name, color, icon, status, and activity.
* 🧩 **Extensible Handlers** — Add support for additional Fourthwall event types through event handlers.

---

## 📦 Requirements

Before installing FW-Notifier, make sure you have:

* [Node.js](https://nodejs.org/) installed.
* A Discord bot.
* The Discord bot token.
* The ID of the Discord channel that should receive notifications.
* A publicly accessible server if Fourthwall needs to reach your webhook.
* A Fourthwall webhook configuration.

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kiripixels/FW-Notifier.git
cd FW-Notifier
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CHANNEL_ID=your_channel_id_here

PORT=9674
WEBHOOK_SLUG=/api/v1.0/fourthwall
WEBHOOK_SECRET=your_webhook_secret_here

BRAND_NAME=FW-Notifier
BRAND_COLOR=#5865F2
BRAND_ICON_URL=

BOT_STATUS=online
BOT_ACTIVITY_TYPE=Watching
BOT_ACTIVITY_TEXT=Fourthwall Orders
```

> ⚠️ **Never commit your `.env` file or expose your Discord bot token.**

### 4. Start the application

```bash
node index.js
```

If everything is configured correctly, FW-Notifier will log into Discord and start the webhook server.

You should see output similar to:

```text
Webhook server listening on port 9674
Endpoint: POST /api/v1.0/fourthwall
Endpoint: POST /api/v1.0/fourthwall/:type
```

---

## ⚙️ Configuration

FW-Notifier is configured through environment variables.

| Variable             | Default                | Description                                            |
| -------------------- | ---------------------- | ------------------------------------------------------ |
| `DISCORD_TOKEN`      | —                      | Discord bot token.                                     |
| `DISCORD_CHANNEL_ID` | —                      | Discord channel where notifications are sent.          |
| `PORT`               | `9674`                 | Port used by the Express server.                       |
| `WEBHOOK_SLUG`       | `/api/v1.0/fourthwall` | Base webhook URL path.                                 |
| `WEBHOOK_SECRET`     | —                      | Optional secret used to authenticate webhook requests. |
| `BRAND_NAME`         | `FW-Notifier`          | Name displayed by the notification system.             |
| `BRAND_COLOR`        | `#5865F2`              | Discord embed color.                                   |
| `BRAND_ICON_URL`     | —                      | Optional branding/icon URL.                            |
| `BOT_STATUS`         | `online`               | Discord bot status.                                    |
| `BOT_ACTIVITY_TYPE`  | `Watching`             | Discord activity type.                                 |
| `BOT_ACTIVITY_TEXT`  | `Fourthwall Orders`    | Discord activity text.                                 |

---

## 🔗 Webhook API

### Base Endpoint

```http
POST /api/v1.0/fourthwall
```

The event type is provided in the request body.

Example:

```json
{
  "type": "ORDER_PLACED",
  "data": {}
}
```

FW-Notifier extracts `type` and passes `data` to the corresponding event handler.

### Event-Specific Endpoint

You can also provide the event type directly in the URL:

```http
POST /api/v1.0/fourthwall/ORDER_PLACED
```

With a request body such as:

```json
{
  "data": {}
}
```

This is useful when your webhook provider allows you to configure a separate endpoint for each event type.

---

## 🔐 Webhook Security

FW-Notifier supports optional webhook authentication through the `X-Webhook-Secret` header.

Set a secret in `.env`:

```env
WEBHOOK_SECRET=your_webhook_secret
```

Then include the same value when making webhook requests:

```http
X-Webhook-Secret: your_webhook_secret
```

Requests with an invalid secret receive `401 Unauthorized`.

```json
{
  "error": "Unauthorized"
}
```

If `WEBHOOK_SECRET` is empty, webhook authentication is disabled.

> 💡 **Recommended:** Always configure a webhook secret when exposing FW-Notifier to the public internet.

---

## 🩺 Health Check

FW-Notifier includes a simple health endpoint:

```http
GET /health
```

A healthy server responds with:

```json
{
  "status": "ok"
}
```

This can be used with uptime monitoring, reverse proxies, Docker health checks, hosting platforms, load balancers, or custom monitoring systems.

---

## 📡 Response Codes

| Status | Description                     |
| -----: | ------------------------------- |
|  `200` | Request processed successfully. |
|  `400` | Unsupported event type.         |
|  `401` | Invalid webhook secret.         |
|  `503` | Discord channel is not ready.   |
|  `500` | Internal processing error.      |

Successful webhook requests return:

```json
{
  "status": "ok"
}
```

Unsupported events return:

```json
{
  "error": "Unsupported type: EVENT_TYPE"
}
```

---

## 🧩 Event Handlers

FW-Notifier uses an event-handler system to process different Fourthwall events.

```text
Fourthwall Event
       │
       ▼
   Event Type
       │
       ▼
 handlers[type]
       │
       ▼
 Discord Embed
       │
       ▼
 Discord Channel
```

This makes it easy to add support for additional event types without changing the webhook server itself.

For example, an `ORDER_PLACED` event can be handled by an `ORDER_PLACED` handler which receives the event data and returns a Discord embed.

---

## 🤖 Discord Bot Setup

Create a Discord application and bot, then add the bot to your server.

The bot needs access to the configured notification channel.

At minimum, make sure the bot can:

* View the channel
* Send messages
* Embed links

You will need the bot token for:

```env
DISCORD_TOKEN=your_bot_token_here
```

And the target channel ID for:

```env
DISCORD_CHANNEL_ID=your_channel_id_here
```

---

## 🌐 Fourthwall Setup

Once FW-Notifier is running and publicly accessible, configure Fourthwall to send its webhook events to:

```text
https://your-domain.com/api/v1.0/fourthwall
```

If you are using the event-specific format:

```text
https://your-domain.com/api/v1.0/fourthwall/ORDER_PLACED
```

If webhook authentication is enabled, make sure your Fourthwall webhook configuration sends the matching secret using:

```http
X-Webhook-Secret: your_webhook_secret
```

> **Note:** Your server must be publicly reachable by Fourthwall for webhook delivery to work.

---

## 📁 Project Structure

```text
FW-Notifier/
├── .env.example
├── config.js
├── discordClient.js
├── handlers.js
├── index.js
├── server.js
├── package.json
└── README.md
```

### Core Files

| File               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `index.js`         | Application entry point.                 |
| `server.js`        | Express server and webhook routes.       |
| `config.js`        | Environment configuration.               |
| `discordClient.js` | Discord connection and channel handling. |
| `handlers.js`      | Fourthwall event handlers.               |
| `.env.example`     | Example environment configuration.       |

---

## 🏗️ Architecture

FW-Notifier keeps the HTTP layer and Discord logic separated.

### Startup

```text
index.js
   │
   ├── Login to Discord
   │
   └── Create Express Server
             │
             ├── Webhook Routes
             └── Health Route
```

### Webhook Processing

```text
Incoming Request
       │
       ▼
Secret Validation
       │
       ▼
Event Type Lookup
       │
       ▼
Event Handler
       │
       ▼
Discord Embed
       │
       ▼
Configured Channel
```

---

## 🛡️ Production Recommendations

If you're running FW-Notifier in production, consider:

* Use **HTTPS**.
* Configure `WEBHOOK_SECRET`.
* Never commit `.env`.
* Keep your Discord token private.
* Run the application with a process manager such as PM2.
* Put the Express server behind a reverse proxy when appropriate.
* Restrict your Discord bot's permissions to only what it needs.
* Monitor `/health`.
* Keep Node.js and project dependencies updated.

### Example with PM2

Install PM2:

```bash
npm install -g pm2
```

Start FW-Notifier:

```bash
pm2 start index.js --name fw-notifier
```

Save the process:

```bash
pm2 save
```

---

## 🐛 Troubleshooting

### Discord bot does not connect

Check:

```env
DISCORD_TOKEN=your_bot_token_here
```

Make sure the token is valid and the bot has been added to your Discord server.

### No notifications appear

Verify:

* `DISCORD_CHANNEL_ID` is correct.
* The bot can access the channel.
* The bot can send messages.
* The bot can embed links.
* The Discord client successfully connected.
* The event type is supported by `handlers.js`.

### `401 Unauthorized`

Your webhook secret does not match.

Check:

```env
WEBHOOK_SECRET=your_webhook_secret
```

and make sure the incoming request contains the matching `X-Webhook-Secret` header.

### `400 Unsupported type`

The received event type does not have a matching handler.

Check the event type and the available handlers in `handlers.js`.

### `503 Channel not ready`

The Discord target channel could not be accessed at the time of the request.

Check:

* Discord connection status.
* `DISCORD_CHANNEL_ID`.
* Bot permissions.
* Discord availability.

### `500 Internal error`

An error occurred while processing the event.

Check the FW-Notifier console output for the underlying error.

---

## 🔒 Security

Please keep the following secrets private:

```env
DISCORD_TOKEN=
WEBHOOK_SECRET=
```

Do **not**:

* Commit `.env` to Git.
* Paste your bot token into public issues.
* Share your webhook secret publicly.
* Hard-code secrets into source files.

A `.gitignore` should include:

```gitignore
.env
node_modules/
```

---

## 📄 License

FW-Notifier is licensed under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Exoworo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  <strong>FW-Notifier</strong><br>
  Fourthwall notifications delivered directly to Discord.
</p>

<p align="center">
  Made with ❤️ by <strong>Exoworo</strong>
</p>
