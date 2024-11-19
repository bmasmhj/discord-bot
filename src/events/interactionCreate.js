const statusCommand = require('../commands/status');
const restartCommand = require('../commands/restart');
const stopCommand = require('../commands/stop');
const helpCommand = require('../commands/help');
const playersCommand = require('../commands/players');

module.exports = async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Delegate to respective command handler
  if (commandName === 'status') {
    statusCommand(interaction);
  } else if (commandName === 'restart') {
    restartCommand(interaction);
  } 
  else if (commandName === 'stop') {
    stopCommand(interaction);
  }
  else if( commandName === 'help'){
     helpCommand(interaction);
  }
  else if( commandName === 'players'){
    playersCommand(interaction);
  }
  else {
    interaction.reply('Unknown command.');
  }
};
