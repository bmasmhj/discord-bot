const { EmbedBuilder } = require('discord.js');

const { status } = require('mc-server-utilities');


module.exports = (interaction) => {
  
    const host = '4.240.101.70'; // Ensure this is a string
    const port = 25565; // Default Minecraft server port



    status(host, port).then((response) => {
        let ServerStatus = '';
        let onlinePlayers = ''; 
        let players = '';
    
    
        console.log('Server Info:', response);
        console.log(`Active Players: ${response.onlinePlayers}`);
        console.log(`Max Players: ${response.maxPlayers}`);
        console.log(`Players List:`, response.players);

        ServerStatus = response.roundTripLatency + 'ms';
        onlinePlayers = response.players.online + '/' + response.players.max;
        response.players.sample.map((data) => {
            players += `**${data.name}**\n`;
        })

        const embed = new EmbedBuilder()
            .setTitle('Server Info')
            .setColor('DarkNavy')
            .setDescription(`
                Server Status: **${ServerStatus}**
                Online Players: **${onlinePlayers}**

                ---- Players ----

                ${players}
            `)
            interaction.reply({ embeds: [embed] });

    }).catch((error) => {
        console.error('Failed to query server:', error);
        const failedEmbed = new EmbedBuilder()
            .setTitle('Failed to query server')
            .setColor('Red')
        interaction.reply({ embeds: [failedEmbed] });
    });
};
