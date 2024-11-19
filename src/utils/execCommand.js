const { exec } = require('child_process');

module.exports.execCommand = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`, error);
    }
    callback(error, stdout, stderr);
  });
};
