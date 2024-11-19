const { EmbedBuilder } = require('discord.js');

module.exports = (interaction) => {
  

    const embed = new EmbedBuilder()
        .setTitle('Commands List')
        .setColor('DarkNavy')
        .setDescription(`
            **/restart** - Restarts the Minecraft server
            **/stop** - Stops the Minecraft server
            **/status** - Checks the status of the Minecraft server
            **/help** - Displays this message
        `)

        interaction.reply({ embeds: [embed] });
};
