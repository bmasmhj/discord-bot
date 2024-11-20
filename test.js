const fs = require('fs');
const readline = require('readline');

// Path to the log file
const logFilePath = '/home/azureuser/minecraft-server-pokemon/logs/latest.log';

// Watch the file for changes
fs.watch(logFilePath, (eventType) => {
  if (eventType === 'change') {
    processLogFile(logFilePath);
  }
});

// Function to process the log file
function processLogFile(filePath) {
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
        console.log(line);
    } else if (line.includes('left the game')) {
        console.log(line);
    }
    console.log('LINE CHANGED');
  });

  rl.on('close', () => {
    fileStream.close();
  });
}
