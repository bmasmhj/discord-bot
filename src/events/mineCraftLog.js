const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

// Function to process only the last line of the log file
function processLogFile(filePath, bot) {
  const fileStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
  });

  let buffer = '';
  fileStream.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep the incomplete line for the next chunk
  });

  fileStream.on('end', () => {
    // Process the last complete line
    const lastLine = buffer.trim();
    console.log('Last line:', lastLine);
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
  processLogFile,
};
