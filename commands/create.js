// create.js

const { Markup } = require('telegraf'); // Add this line

// Create command handler
function createCommand(ctx, bot) {
    const createMessage = "Let's create an awesome MemeContest for your community! What is your project name?";
    ctx.reply(createMessage);
  
    // Set up the next middleware to handle the user's response for project name
    bot.on('text', function handleProjectNameResponse(ctx) {
      const projectName = ctx.message.text;
    
      // Save the project name in the context or database as needed
      // For example: ctx.session.projectName = projectName;
    
      // Respond to the user with the next step question
      const nextStepMessage = `Fantastic, your competition will be called ${projectName} Meme Contest! For how many days, do you want the tournament to be open? We recommend 1 to 3 days :)`;
     
      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('1 day', '1'),
        Markup.button.callback('3 days', '3'),
        Markup.button.callback('5 days', '5'),
      ]);
    
      // Send the message with the inline keyboard
      ctx.reply(nextStepMessage, keyboard);
  
  

      // Set up the next middleware to handle the user's response for Step 2 (tournament duration)
      bot.on('callback_query', (ctx) => handleTournamentDurationResponse(ctx, bot));

    });
  }
  
function handleTournamentDurationResponse(ctx, bot) {
  const selectedDuration = ctx.callbackQuery.data;

  // Save the selected duration in the context or database as needed
  // For example: ctx.session.selectedDuration = selectedDuration;

  // Create an inline keyboard with the prize options
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('0.05 ETH', '0.05'),
    Markup.button.callback('0.1 ETH', '0.1'),
    Markup.button.callback('0.25 ETH', '0.25'),
    Markup.button.callback('0.5 ETH', '0.5'),
    Markup.button.callback('1 ETH', '1'),
  ]);

  // Respond to the user with the prize options
  ctx.reply(`You chose ${selectedDuration} days for the tournament duration! How much do you want to give in rewards to the winners (top 3 most voted memes + a random one)?`, keyboard);

  // Set up the next middleware to handle the user's response for Step 3 (prize amount)
  bot.on('callback_query', (ctx) => handlePrizeAmountResponse(ctx, bot));
}

function handlePrizeAmountResponse(ctx) {
  const selectedPrize = ctx.callbackQuery.data;

  // Save the selected prize amount in the context or database as needed
  // For example: ctx.session.selectedPrize = selectedPrize;

  // Respond to the user acknowledging their prize selection
  ctx.reply(`You chose ${selectedPrize} ETH to give in rewards to the winners (top 3 most voted memes + a random one). To activate the bot, please send the payment here.`);
}

module.exports = { createCommand };
