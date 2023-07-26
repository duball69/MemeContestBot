// Help command handler
function helpCommand(ctx, bot) {
  const helpMessage =
    "ℹ️ Help\n" +
    "Welcome to the Crypto Meme Contest Bot!\n" +
    "Here are some available commands:\n" +
    "/start - Start using the bot\n" +
    "/create - Create a new meme contest\n" +
    "/submit - Submit a meme to a contest\n" +
    "/help - Show this help message\n" +
    "/find - Find existing contests\n" +
    "Feel free to explore the bot and have fun! 🚀";
  bot.sendMessage(ctx.chat.id, helpMessage);
}

module.exports = { helpCommand };
