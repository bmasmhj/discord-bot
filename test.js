const { exec } = require('child_process');

// Discord Webhook URL
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1308279338722131998/xIhsOVkur6KfZSNXje8c5YKduT09BJcXRgbBjsfm0mKI56ULaGfSAjFWp-ydtSVUdkpa';

// Monitor Service
// setInterval(() => {
  exec('systemctl is-active minecraft-server.service', (error, stdout) => {
    if (stdout.trim() !== 'active') {
      console.log('Minecraft server is down. Sending notification...');
      exec(`curl -H "Content-Type: application/json" -X POST -d '{"content":"Minecraft server is down!"}' ${WEBHOOK_URL}`);
    }else{
        console.log('Minecraft server is up.');
        exec(`curl -H "Content-Type: application/json" -X POST -d '{"content":"Minecraft server is up!"}' ${WEBHOOK_URL}`);
    }
  });
// }, 60000); // Check every 60 seconds
