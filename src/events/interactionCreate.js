const statusCommand = require('../commands/status');
const restartCommand = require('../commands/restart');
const stopCommand = require('../commands/stop');
const helpCommand = require('../commands/help');
const playersCommand = require('../commands/players');

module.exports = async (interaction) => {

  if(interaction.isUserContextMenuCommand()){
    const command = interaction.commandName;
    if (!command) return;
    try {
        if (command === 'status') {
            await statusCommand(interaction , 'app');
        } else if (command === 'restart') {
            await restartCommand(interaction , 'app');
        } else if (command === 'stop') {
            await stopCommand(interaction , 'app');
        } else if (command === 'help') {
            await helpCommand(interaction , 'app');
        } else if (command === 'players') {
            await playersCommand(interaction , 'app');
        }else{
            await interaction.deferReply()
            await interaction.editReply({ content: 'Unknown command.', ephemeral: true });
        }
    }
    catch (error) {
        console.error('Error executing command:', error);
        await interaction.deferReply()
        await interaction.editReply({ content: 'An error occurred while executing this command.', ephemeral: true });
    }
  }
  else if (interaction.isCommand()) {
    // Handling Slash Commands
    const { commandName } = interaction;
  
    // Delegate to respective command handler
    if (commandName === 'status') {
      statusCommand(interaction , 'slash');
    } else if (commandName === 'restart') {
      restartCommand(interaction , 'slash');
    } 
    else if (commandName === 'stop') {
      stopCommand(interaction , 'slash');
    }
    else if( commandName === 'help'){
       helpCommand(interaction , 'slash');
    }
    else if( commandName === 'players'){
      playersCommand(interaction , 'slash');
    }
    else {
      interaction.reply('Unknown command.' , 'slash');
    }
  } 
 
};
