const { queryFull } = require('minecraft-server-util');

const host = 'your.minecraftserver.com'; // Replace with your server's IP or hostname
const port = 25565; // Default Minecraft server port

queryFull({ host, port })
  .then((response) => {
    console.log('Server Info:', response);
    console.log(`Active Players: ${response.onlinePlayers}`);
    console.log(`Max Players: ${response.maxPlayers}`);
    console.log(`Players List:`, response.players);
  })
  .catch((error) => {
    console.error('Failed to query server:', error);
  });
