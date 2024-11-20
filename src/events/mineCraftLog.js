const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

function processLastLogLine(filePath, bot) {
  // Open the file for reading
  const fileStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
  });

  let buffer = '';
  fileStream.on('data', (chunk) => {
    buffer += chunk;
  });

  fileStream.on('end', () => {
    // Split buffer into lines
    const lines = buffer.split('\n');
    const lastLine = lines[lines.length - 2] || lines[lines.length - 1]; // Handles if last line is empty
    console.log(lastLine);
    if (lastLine.includes('joined the game')) {
      sendEmbed(bot, lastLine, 'Green');
    } else if (lastLine.includes('left the game')) {
      sendEmbed(bot, lastLine, 'Red');
    }
  });

  fileStream.on('error', (err) => {
    console.error('Error reading the file:', err);
  });
}

// Helper function to send embed messages
function sendEmbed(bot, message, color) {
  const channel = bot.channels.cache.get(process.env.CHANNEL_ID);
  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle(message)
      .setColor(color)
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
}

module.exports = {
  processLastLogLine,
};
