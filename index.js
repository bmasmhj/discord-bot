const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { exec } = require('child_process');

// Bot configuration


// Initialize the bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register slash commands
const commands = [
  {
    name: 'status',
    description: 'Check the status of the Minecraft server',
  },
  {
    name: 'restart',
    description: 'Restart the Minecraft server',
  },
];

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
})();

// Handle slash commands
bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'status') {
    // Check the status of the Minecraft server
    exec(`systemctl is-active ${SERVICE_NAME}`, (error, stdout) => {
      if (error) {
        console.error('Error checking status:', error);
        interaction.reply('Failed to check server status. Please try again.');
        return;
      }

      const status = stdout.trim();
      if (status === 'active') {
        interaction.reply('✅ Minecraft server is running.');
      } else if (status === 'inactive') {
        interaction.reply('⚠️ Minecraft server is stopped.');
      } else if (status === 'failed') {
        interaction.reply('❌ Minecraft server has failed.');
      } else {
        interaction.reply(`Unknown status: ${status}`);
      }
    });
  } else if (commandName === 'restart') {
    // Restart the Minecraft server
    interaction.reply('Restarting Minecraft server...');
    exec(`sudo systemctl restart ${SERVICE_NAME}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error restarting server:', error);
        interaction.followUp('❌ Failed to restart the Minecraft server. Please check logs.');
        return;
      }

      interaction.followUp('🔄 Minecraft server restarted successfully!');
    });
  }
});

// Login to Discord
bot.login(BOT_TOKEN);
