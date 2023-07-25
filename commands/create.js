// create.js

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
      ctx.reply(nextStepMessage);
  
      // Remove the event listener for handling project name and move on to the next step (handleTournamentDurationResponse)
      bot.off('text', handleProjectNameResponse);
  
      // Set up the next middleware to handle the user's response for Step 2 (tournament duration)
      bot.on('text', handleTournamentDurationResponse);
    });
  }
  
  function handleTournamentDurationResponse(ctx) {
    const duration = ctx.message.text;
    // Handle the user's response for tournament duration here
    // ...
  }
  
  module.exports = { createCommand };
  