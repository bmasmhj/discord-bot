const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('./config/dotenv');
const registerCommands = require('./commands/registerCommands');
const interactionCreateHandler = require('./events/interactionCreate');
const readyHandler = require('./events/ready');

// Load environment variables
dotenv.loadEnv();

// Initialize the bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register event handlers
bot.on('interactionCreate', interactionCreateHandler);
bot.on('ready', readyHandler(bot));

// Register slash commands
registerCommands();

// Start the bot
bot.login(process.env.BOT_TOKEN);
