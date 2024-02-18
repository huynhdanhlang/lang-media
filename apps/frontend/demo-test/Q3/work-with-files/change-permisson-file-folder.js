const fs = require('node:fs');
const path = __dirname + '/file.txt';

// Allowing only read permission
console.log("Giving only read permission to user");
fs.chmodSync(path, fs.constants.S_IRUSR);