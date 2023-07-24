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

// Command handlers
bot.start(startCommand);
bot.command('create', createCommand);
bot.command('submit', (ctx) => {
  ctx.reply('You have used /submit command.');
});
bot.command('help', helpCommand);
bot.command('find', findCommand);

// Set the Telegram bot webhook after a delay
async function setWebhookAfterDelay() {
  await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds delay
  try {
    await bot.telegram.setWebhook(
      `${process.env.HEROKU_WEBHOOK_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`
    );
    console.log('Webhook set successfully!');
    // Start the bot after setting the webhook to reduce unnecessary API calls
    bot.launch({
      webhook: {
        domain: process.env.HEROKU_WEBHOOK_URL,
        port: process.env.PORT,
      },
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

// Call the setWebhook function to set up the webhook
setWebhookAfterDelay();
  