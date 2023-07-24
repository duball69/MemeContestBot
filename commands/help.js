// Help command handler
function helpCommand(ctx) {
    const helpMessage = 'Available commands:\n\n/help - Show different options with explanation\n...';
    ctx.reply(helpMessage);
  }
  
  module.exports = { helpCommand };

  