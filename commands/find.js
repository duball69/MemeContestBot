// Find command handler
function findCommand(ctx, bot) {
  const findMessage =
    "🔍 Find Existing Contests\n" +
    "Here are some of the existing meme contests:\n" +
    "1. Contest A - Prize: 0.1 ETH - Winners: 1\n" +
    "2. Contest B - Prize: 0.05 ETH - Winners: 3\n" +
    "3. Contest C - Prize: 0.2 ETH - Winners: 2\n" +
    "4. Contest D - Prize: 0.3 ETH - Winners: 3\n" +
    "5. Contest E - Prize: 0.15 ETH - Winners: 1\n" +
    "Join the fun and participate in these contests now!\n" +
    "Remember to submit your funniest memes! 🚀";
  bot.sendMessage(ctx.chat.id, findMessage);
}

module.exports = { findCommand };
