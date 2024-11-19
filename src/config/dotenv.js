const dotenv = require('dotenv');

module.exports.loadEnv = () => {
  dotenv.config();
  if (!process.env.BOT_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
    console.error('Missing required environment variables.');
    process.exit(1);
  }
};
