const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction , mode ) => {
    if(mode == 'app'){
        await interaction.deferReply();
    }
    const embed = new EmbedBuilder()
        .setTitle('Commands List')
        .setColor('DarkNavy')
        .setDescription(`
            **/restart** - Restarts the Minecraft server
            **/stop** - Stops the Minecraft server
            **/status** - Checks the status of the Minecraft server
            **/help** - Displays this message
            **/players** - Displays the current players on the Minecraft server
        `)

    if(mode === 'slash'){
        console.log('Interaction Reply');
        await interaction.reply({ embeds: [embed] });
    }else{
        console.log('Interaction Edit Reply');
        await interaction.editReply({ embeds: [embed] });
    }
        
};
