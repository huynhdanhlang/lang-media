const fs = require('fs');
// Check write permission
const path = __dirname + '\\file.txt';
try {
  fs.accessSync(path, fs.constants.W_OK);
  console.log('can write %s', path);
}
catch (err) {
  console.log("%s doesn't exist", path);
}