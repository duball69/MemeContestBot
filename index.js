 const TelegramBot = require('node-telegram-bot-api');

const token = '6670493561:AAHZKIbE-RuH6FygXQzencxTqmNHtLZTbko';
const bot = new TelegramBot(token, { polling: true });

// Object to store active contests
const contests = {};

// Object to store the state of conversations with users
const userStates = {};

// Command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = 'Welcome to the Crypto Meme Contest Bot! Use /createcontest to start a new contest, /setrewards to set the reward for the winner, /choosewinners to choose the number of winners, or /viewcontests to see existing contests.';
  bot.sendMessage(chatId, message);
});

// Command: /createcontest
bot.onText(/\/createcontest/, (msg) => {
  const chatId = msg.chat.id;

  // Set the state to 'waiting_for_project_name'
  userStates[chatId] = 'waiting_for_project_name';

  bot.sendMessage(chatId, 'What\'s the name of your project?');
});

// Handle user answers for /createcontest
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const state = userStates[chatId];

  if (state === 'waiting_for_project_name') {
    const projectName = msg.text;

    if (!projectName) {
      bot.sendMessage(chatId, 'Please provide a name for the project.');
      return;
    }

    if (contests[projectName]) {
      bot.sendMessage(chatId, 'A contest with this name already exists. Please choose a different name.');
      return;
    }

    // Set the state to 'waiting_for_reward'
    userStates[chatId] = 'waiting_for_reward';

    // Store the project name for later use
    userStates[chatId] = { projectName };

    bot.sendMessage(chatId, `Project name set as: ${projectName}\nNow, please choose the reward for the winner:`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '0.1 BNB', callback_data: '0.1' },
            { text: '0.3 BNB', callback_data: '0.3' },
            { text: '0.5 BNB', callback_data: '0.5' },
          ],
        ],
      },
    });
  } else if (state === 'waiting_for_reward') {
    // User selected a reward option
    const reward = msg.text;
    const { projectName } = userStates[chatId];

    // Check if the user selected a valid reward option
    if (['0.1', '0.3', '0.5'].includes(reward)) {
      contests[projectName] = {
        ...contests[projectName],
        reward,
      };

      // Set the state to 'waiting_for_winners'
      userStates[chatId] = 'waiting_for_winners';

      bot.sendMessage(chatId, `Reward for the winner of ${projectName} set as: ${reward} BNB\nNow, please choose the number of winners:`, {
        reply_markup: {
          keyboard: [['1 Winner'], ['2 Winners'], ['3 Winners']],
          one_time_keyboard: true,
        },
      });
    } else {
      bot.sendMessage(chatId, 'Invalid reward option. Please choose a valid reward.');
    }
  } else if (state === 'waiting_for_winners') {
    // User selected the number of winners
    const winners = msg.text;
    const { projectName } = userStates[chatId];

    // Check if the user selected a valid number of winners
    if (['1 Winner', '2 Winners', '3 Winners'].includes(winners)) {
      contests[projectName] = {
        ...contests[projectName],
        winners: parseInt(winners, 10),
      };

      // Reset the state to null
      userStates[chatId] = null;

      bot.sendMessage(chatId, `Number of winners for ${projectName} set as: ${winners}`);
    } else {
      bot.sendMessage(chatId, 'Invalid number of winners. Please choose 1 Winner, 2 Winners, or 3 Winners.');
    }
  }
});

// Command: /setrewards
bot.onText(/\/setrewards/, (msg) => {
  const chatId = msg.chat.id;

  // Set the state to 'waiting_for_project_reward'
  userStates[chatId] = 'waiting_for_project_reward';

  bot.sendMessage(chatId, 'Please choose the contest you want to set the reward for:', {
    reply_markup: {
      keyboard: Object.keys(contests).map((projectName) => [{ text: projectName }]),
      one_time_keyboard: true,
    },
  });
});

// Handle callback data from the inline keyboard
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const reward = callbackQuery.data;
  const { projectName } = userStates[chatId];

  contests[projectName] = {
    ...contests[projectName],
    reward,
  };

  // Reset the state to null
  userStates[chatId] = null;

  bot.sendMessage(chatId, `Reward for the winner of ${projectName} set as: ${reward} BNB`);
});

// Command: /choosewinners
bot.onText(/\/choosewinners/, (msg) => {
  const chatId = msg.chat.id;

  // Set the state to 'waiting_for_project_winners'
  userStates[chatId] = 'waiting_for_project_winners';

  bot.sendMessage(chatId, 'Please choose the contest for which you want to set the number of winners:', {
    reply_markup: {
      keyboard: Object.keys(contests).map((projectName) => [{ text: projectName }]),
      one_time_keyboard: true,
    },
  });
});

// Handle user answers for /choosewinners
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const state = userStates[chatId];

  if (state === 'waiting_for_project_winners') {
    const projectName = msg.text;

    if (!contests[projectName]) {
      bot.sendMessage(chatId, 'The selected contest does not exist. Please choose a valid contest.');
      return;
    }

    // Set the state to 'waiting_for_winners_number'
    userStates[chatId] = { projectName };

    bot.sendMessage(chatId, `Please choose the number of winners for ${projectName}:`, {
      reply_markup: {
        keyboard: [['1 Winner'], ['2 Winners'], ['3 Winners']],
        one_time_keyboard: true,
      },
    });
  }
});

// Handle unknown commands
/*bot.onText(/\/\w+/, (msg) => {
  const chatId = msg.chat.id;
  const unknownCommandMessage =
    'Unknown command. Please use /start, /createcontest, /setrewards, /choosewinners, or /viewcontests.';
  bot.sendMessage(chatId, unknownCommandMessage);
});*/

