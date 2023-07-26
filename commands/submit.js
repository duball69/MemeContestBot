// Submit command handler
function submitCommand(ctx, bot) {
  const submitMessage =
    "📢 Submit Your Memes\n" +
    "To submit your hilarious memes, simply post them with the chosen contest hashtag.\n" +
    "Once you've submitted your meme, get your friends to vote for it and stand a chance to win exciting prizes!\n" +
    "Join the contest now and let the meme battle begin! 🚀";
  bot.sendMessage(ctx.chat.id, submitMessage);
}

module.exports = { submitCommand };
