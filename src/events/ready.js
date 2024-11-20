const { execCommand } = require('../utils/execCommand');
const { EmbedBuilder , ActivityType } = require('discord.js');
const dotenv = require('../config/dotenv');
const { status } = require('mc-server-utilities');
const fs = require('fs');
const { processLastLogLine } = require('./mineCraftLog');


dotenv.loadEnv();
module.exports = (bot) => () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  const host = '4.240.101.70'; // Ensure this is a string
  const port = 25565; // Default Minecraft server port



  // Periodic server check
  setInterval(() => {
    console.log('Checking server status...' , process.env.CLIENT_ID);
    if(process.env.CLIENT_ID === '744819593373155359' ){
        console.log('Bot is running on development environment, skipping server check');
        return;
    }else{

        execCommand('systemctl is-active minecraft-server.service', (error, stdout) => {
            if (stdout.trim() !== 'active') {
              const channel = bot.channels.cache.get(process.env.CHANNEL_ID);
              if (channel) {
                  // Server is offline
                  const embed = new EmbedBuilder()
                  .setTitle('Minecraft Server Status - Offline')
                  .setColor('Red')
                  .setTimestamp();
                  channel.send({ embeds: [embed] });
      
      
                  // Attempt to restart server
                  const restartEmbed = new EmbedBuilder()
                  .setTitle('Attempting to Restart Minecraft Server')
                  .setColor('DarkNavy')
                  .setTimestamp();
      
                  channel.send({ embeds: [restartEmbed] });
      
                  execCommand('sudo systemctl restart minecraft-server.service', (restartError) => {
                      if (restartError) {
                        const errorEmbed = new EmbedBuilder()
                          .setTitle('Failed to Restart Minecraft Server')
                          .setColor('Red')
                          .setTimestamp();
          
                        channel.send({ embeds: [errorEmbed] });
                      } else {
                        setTimeout(() => {
                          const successEmbed = new EmbedBuilder()
                            .setTitle('Minecraft Server Restarted Successfully')
                            .setColor('Green')
                            .setTimestamp();
          
                          channel.send({ embeds: [successEmbed] });
                        }, 15000); // Simulated delay for server restart
                      }
                  });
              }
            }
          });
    }
 

    status(host, port).then((response) => {
        bot.user.setPresence({ activities: [{ name: `${response.players.online}/${response.players.max} `, type: ActivityType.Playing }], status: 'online' });
    }).catch((error) => {
        console.error('Failed to query server:', error);
    });
  }, 30000); // Check every minute


  // watch the minecraft log file for changes
  // Path to the log file
  const logFilePath = process.env.LOG_FILE_PATH;
  // Watch the file for changes
  if(!process.env.CHANNEL_ID === '744819593373155359'){
    fs.watch(logFilePath, (eventType) => {
      if (eventType === 'change') {
        processLastLogLine(logFilePath , bot);
      }
    });
  }

};
