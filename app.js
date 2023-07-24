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

// /create command handler
bot.command('create', createCommand); // Add the createCommand function to the command handlers 

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

