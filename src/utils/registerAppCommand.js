const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const commands = require('./commands'); // Import your commands from the commands.js file

module.exports = async () => {
  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  try {
    console.log('Started refreshing application (/) and context menu commands.');

    // Create an array to hold the command builders
    const commandBuilders = commands.map((command) => {
        return new ContextMenuCommandBuilder()
          .setName(command.name)
          .setType(ApplicationCommandType.User);
    });

    // Register the commands using the REST API
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commandBuilders.map((builder) => builder.toJSON()),
    });

    console.log('Successfully reloaded application (/) and context menu commands.');
  } catch (error) {
    console.error('Error refreshing commands:', error);
  }
};
