const { EmbedBuilder } = require('discord.js');

const { status } = require('mc-server-utilities');


module.exports = async (interaction , mode) => {
  
    const host = '4.240.101.70'; // Ensure this is a string
    const port = 25565; // Default Minecraft server port

    if(mode == 'app'){
        await interaction.deferReply();
    }

    status(host, port).then(async (response) => {
        let players = '';
    
    
        let ServerStatus = response.roundTripLatency + 'ms';
        let onlinePlayers = response.players.online + '/' + response.players.max;
        response?.players?.sample?.map((data) => {
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
            if(mode === 'slash'){
                console.log('Interaction Reply');
                await interaction.reply({ embeds: [embed] });
            }else{
                console.log('Interaction Edit Reply');
                await interaction.editReply({ embeds: [embed] });
            }

    }).catch(async (error) => {
        console.error('Failed to query server:', error);
        const failedEmbed = new EmbedBuilder()
            .setTitle('Failed to query server')
            .setColor('Red')


            if(mode === 'slash'){
                console.log('Interaction Reply');
                await interaction.reply({ embeds: [failedEmbed] });
            }else{
                console.log('Interaction Edit Reply');
                await interaction.editReply({ embeds: [failedEmbed] });
            }
    });
};
