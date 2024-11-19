const { execCommand } = require('../utils/execCommand');
const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction , mode) => {
   
  execCommand(`systemctl is-active minecraft-server.service`, async (error, stdout) => {
    if(mode == 'app'){
        await interaction.deferReply();
    }
    console.log(mode)
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
    console.log(mode , 'Interaction Reply MODE');
        if(mode === 'slash'){
            console.log('Interaction Reply');
            await interaction.reply({ embeds: [embed] });
        }else{
            console.log('Interaction Edit Reply');
            await interaction.editReply({ embeds: [embed] });
        }
  });
};
