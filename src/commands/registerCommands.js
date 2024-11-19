const { REST, Routes } = require('discord.js');

module.exports = async () => {
  const commands = [
    {
      name: 'status',
      description: 'Check the status of the Minecraft server',
    },
    {
      name: 'restart',
      description: 'Restart the Minecraft server',
    },
    {
        name: 'stop',
        description: 'Stop the Minecraft server',
    },
    {
        name: 'help',
        description: 'Display the list of available commands',
    },{
        name : 'players',
        description : 'Get the list of players on the server'
    }
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  try {
    console.log('Registering slash commands...');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
};
