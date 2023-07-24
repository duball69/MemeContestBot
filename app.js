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

// Command handlers
bot.start(startCommand);
bot.command('create', createCommand);
bot.command('submit', (ctx) => {
  ctx.reply('You have used /submit command.');
});
bot.command('help', helpCommand);
bot.command('find', findCommand);

// Start the bot using polling instead of webhook
bot.launch().then(() => {
  console.log('Bot is now polling for updates!');
}).catch((err) => {
  console.error('Error starting the bot:', err);
});
