const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = async (message) => {
  if (message.author.bot) return;

  if (message.channelId == process.env.MODS_CHANNEL) {
    console.log('Message from mods channel');

    if (message.attachments.size > 0) {
      console.log('Message has attachments');
      const attachments = message.attachments;
      let jarFiles = [];
      let nonJarFiles = [];

      attachments.forEach((attachment) => {
        if (attachment.name.endsWith('.jar')) {
          jarFiles.push(attachment);
        } else {
          nonJarFiles.push(attachment);
        }
      });

      let desc = '';
      if (jarFiles.length > 0) {
        desc += `**Jar Files:**\n${jarFiles.map((jar) => jar.name).join('\n')}\n\n`;

        // Download .jar files
        for (const jar of jarFiles) {
          try {
            console.log(`Downloading: ${jar.name}`);
            await downloadFile(jar.url, jar.name);


            // Move the file to the mods folder
            const oldPath = path.join('mods', jar.name);
            const newPath = path.join(process.env.MOVE_TO, jar.name);

            fs.renameSync(oldPath, newPath);


          } catch (error) {
            console.error(`Failed to download ${jar.name}:`, error.message);
          }
        }
      }
      if (nonJarFiles.length > 0) {
        desc += `**Non Jar Files:**\n${nonJarFiles.map((file) => file.name).join('\n')}\n`;
      }

      const embed = new EmbedBuilder()
        .setTitle('Files Uploaded')
        .setColor('Green')
        .setDescription(desc)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      await message.delete();
      const warningEmbed = new EmbedBuilder()
        .setTitle('Only .jar files are allowed in this channel')
        .setColor('Red')
        .setTimestamp();

      message.channel.send({ embeds: [warningEmbed] });
    }
  }
};

// Function to download files
async function downloadFile(url, fileName) {
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'stream',
  });

  const downloadPath = path.join('mods', fileName);
  const writer = fs.createWriteStream(downloadPath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
