const fs = require('fs');
const readline = require('readline');
const { EmbedBuilder } = require('discord.js');

// Function to process the log file
 function processLogFile(filePath , bot ) {
  const fileSize = fs.statSync(filePath).size;
  const readStart = Math.max(0, fileSize - 1024); // Ensure 'start' is not negative

  const fileStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    start: readStart,
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
      if (line.includes('joined the game')) {
        const channel = bot.channels.cache.get(process.env.CHANNEL_ID);
        if (channel) {
            // Server is offline
            const embed = new EmbedBuilder()
            .setTitle(line)
            .setColor('Green')
            .setTimestamp();
            channel.send({ embeds: [embed] });
        }
    } else if (line.includes('left the game')) {
        const channel = bot.channels.cache.get(process.env.CHANNEL_ID);
        if (channel) {
            // Server is offline
            const embed = new EmbedBuilder()
            .setTitle(line)
            .setColor('Red')
            .setTimestamp();
            channel.send({ embeds: [embed] });
        }
    }
  });

  rl.on('close', () => {
    fileStream.close();
  });
}

module.exports = {
    processLogFile
}
