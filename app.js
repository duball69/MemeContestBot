const TelegramBot = require('node-telegram-bot-api');
const { initializeFirebase } = require('./firebaseHandler');
const { startCommand } = require('./commands/start.js');
const { createCommand } = require('./commands/create');
const { submitCommand } = require('./commands/submit');
const { helpCommand } = require('./commands/help');
const { findCommand } = require('./commands/find');

require('dotenv').config();

// Initialize Firebase
initializeFirebase();

// Create a new TelegramBot instance with your Telegram Bot Token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Command handlers
bot.onText(/\/start/, (msg) => startCommand(msg, bot));
bot.onText(/\/create/, (msg) => createCommand(msg, bot));
bot.onText(/\/submit/, (msg) => {
  bot.sendMessage(msg.chat.id, 'You have used /submit command.');
});
bot.onText(/\/help/, (msg) => helpCommand(msg, bot));
bot.onText(/\/find/, (msg) => findCommand(msg, bot));

// Start the bot
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Bot is now polling for updates!');
