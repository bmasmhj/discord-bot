const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('./config/dotenv');
const registerCommands = require('./utils/registerCommands');
const registerAppCommand = require('./utils/registerAppCommand');
const interactionCreateHandler = require('./events/interactionCreate');
const readyHandler = require('./events/ready');
const fs = require('fs');
const { processLogFile } = require('./events/mineCraftLog');

// Load environment variables
dotenv.loadEnv();

// Initialize the bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register event handlers
bot.on('interactionCreate', interactionCreateHandler);
bot.on('ready', readyHandler(bot));

// Register slash commands
registerCommands();
registerAppCommand();


// watch the minecraft log file for changes
// Path to the log file
const logFilePath = process.env.LOG_FILE_PATH;
// Watch the file for changes
fs.watch(logFilePath, (eventType) => {
  if (eventType === 'change') {
    processLogFile(logFilePath);
  }
});




// Start the bot
bot.login(process.env.BOT_TOKEN);
