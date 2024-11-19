const { EmbedBuilder } = require('discord.js');
const { execCommand } = require('../utils/execCommand');

module.exports = async (interaction) => {
  // Defer the reply to allow time for the operation to complete
  await interaction.deferReply();

  const embed = new EmbedBuilder()
    .setTitle('Restarting Minecraft Server')
    .setColor('DarkNavy');

  // Inform user that the restart process has begun
  await interaction.editReply({ embeds: [embed] });

  execCommand(`sudo systemctl stop minecraft-server.service`, (error) => {
    if (error) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('Failed to restart Minecraft Server')
        .setColor('Red');

      // Follow up with an error message
      interaction.followUp({ embeds: [errorEmbed] });
    } else {
        const successEmbed = new EmbedBuilder()
          .setTitle('Minecraft Server Restarted Successfully')
          .setColor('Green');
        // Follow up with a success message after the restart completes
        interaction.followUp({ embeds: [successEmbed] });
    }
  });
};
