const { Telegraf } = require('telegraf');
const { initializeFirebase } = require('./firebaseHandler');
const { startCommand } = require('./commands/start.js');
const { createCommand } = require('./commands/create');
const { submitCommand } = require('./commands/submit');
const { helpCommand } = require('./commands/help');
const { findCommand } = require('./commands/find');

require('dotenv').config();

// Initialize Firebase
initializeFirebase();

// Create a new Telegraf instance with your Telegram Bot Token
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Set the Telegram bot webhook
async function setWebhook() {
  const fetch = await import('node-fetch');
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const webhookURL = process.env.HEROKU_WEBHOOK_URL;

  const apiUrl = `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookURL}/bot${botToken}`;

  try {
    const response = await fetch.default(apiUrl);
    const data = await response.json();
    console.log('Webhook set:', data);
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

// Call the setWebhook function to set up the webhook
setWebhook();

// Command handlers
bot.start(startCommand);

// /create command handler
bot.command('create', createCommand);

// /submit command handler
bot.command('submit', (ctx) => {
  ctx.reply('You have used /submit command.');
});

// /help command handler
bot.command('help', helpCommand);

// /find command handler
bot.command('find', findCommand);

// Start the bot
bot.launch();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
