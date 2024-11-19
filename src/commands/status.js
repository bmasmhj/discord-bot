const { execCommand } = require('../utils/execCommand');
const { EmbedBuilder } = require('discord.js');

module.exports = (interaction) => {
  execCommand(`systemctl is-active minecraft-server.service`, (error, stdout) => {
    const status = stdout.trim();
    let title = '';
    let color = '';
    
    if(status === 'active') {
        title = 'Minecraft Server Status - Online';
        color = 'Green';
    }
    else if(status === 'inactive') {
        title = 'Minecraft Server Status - Offline';
        color = 'Red';
    } 
    else if(status === 'failed') {
        title = 'Minecraft Server Status - Failed';
        color = 'DarkRed';
    }
    else{
        title = 'Minecraft Server Status - Unknown';
        color = 'DarkGold';
    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(color)

        interaction.reply({ embeds: [embed] });
  });
};
