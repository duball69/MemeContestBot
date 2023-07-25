// Create command handler
function createCommand(ctx) {
    const createMessage = "Let's create an awesome MemeContest for your community! What is your project name?";
    ctx.reply(createMessage);
  }
  
  module.exports = { createCommand };

  