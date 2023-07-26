// create.js

// Create command handler
function createCommand(ctx, bot) {
    const createMessage =
      "Let's create an awesome MemeContest for your community! What is your project name?";
    bot.sendMessage(ctx.chat.id, createMessage);
  
    // Set up the next middleware to handle the user's response for project name
    bot.onText(/(.+)/, function handleProjectNameResponse(msg) {
      const projectName = msg.text;
  
      // Save the project name in the context or database as needed
      // For example: ctx.session.projectName = projectName;
  
      // Respond to the user with the next step question
      const nextStepMessage = `Fantastic, your competition will be called ${projectName} Meme Contest! For how many days, do you want the tournament to be open? We recommend 1 to 3 days :)`;
  
      const keyboard = {
        inline_keyboard: [
          [{ text: '1 day', callback_data: '1' }],
          [{ text: '3 days', callback_data: '3' }],
          [{ text: '5 days', callback_data: '5' }],
        ],
      };
  
      // Send the message with the inline keyboard
      bot.sendMessage(ctx.chat.id, nextStepMessage, { reply_markup: keyboard });
  
      // Set up the next middleware to handle the user's response for Step 2 (tournament duration)
      bot.on('callback_query', (query) => handleTournamentDurationResponse(query, bot));
    });
  }
  
  function handleTournamentDurationResponse(query, bot) {
    const selectedDuration = query.data;
    const chatId = query.message.chat.id;
  
    // Save the selected duration in the context or database as needed
    // For example: ctx.session.selectedDuration = selectedDuration;
  
    // Create an inline keyboard with the prize options
    const keyboard = {
      inline_keyboard: [
        [{ text: '0.05 ETH', callback_data: '0.05' }],
        [{ text: '0.1 ETH', callback_data: '0.1' }],
        [{ text: '0.25 ETH', callback_data: '0.25' }],
        [{ text: '0.5 ETH', callback_data: '0.5' }],
        [{ text: '1 ETH', callback_data: '1' }],
      ],
    };
  
    // Respond to the user with the prize options
    bot.sendMessage(
      chatId,
      `You chose ${selectedDuration} days for the tournament duration! How much do you want to give in rewards to the winners (top 3 most voted memes + a random one)?`,
      { reply_markup: keyboard }
    );
  
    // Set up the next middleware to handle the user's response for Step 3 (prize amount)
    bot.on('callback_query', (query) => handlePrizeAmountResponse(query, bot));
  }
  
  function handlePrizeAmountResponse(query, bot) {
    const selectedPrize = query.data;
    const chatId = query.message.chat.id;
  
    // Save the selected prize amount in the context or database as needed
    // For example: ctx.session.selectedPrize = selectedPrize;
  
    // Respond to the user acknowledging their prize selection
    bot.sendMessage(
      chatId,
      `You chose ${selectedPrize} ETH to give in rewards to the winners (top 3 most voted memes + a random one). To activate the bot, please send the payment here.`
    );
  }
  
  module.exports = { createCommand };
  