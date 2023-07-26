// Start command handler
function startCommand(ctx, bot) {
    const chatId = ctx.chat.id;
    const welcomeMessage =
      "🎉 Welcome to our Meme Contest Bot! 🎉\n\n" +
      "Join meme contests, unleash your creativity, and earn with it! 🤣🤣🚀\n\n" +
      "👉 Type /create to create your own meme contest!\n" +
      "👉 Share your hilarious creations using the chosen hashtag.\n" +
      "👉 Vote for your favorite memes and win exciting prizes 🏆\n\n" +
      "Get ready to showcase your humor. Let the fun begin!";
    bot.sendMessage(chatId, welcomeMessage);
  }
  
  // Export the function to make it accessible from other files
  module.exports = { startCommand };
  