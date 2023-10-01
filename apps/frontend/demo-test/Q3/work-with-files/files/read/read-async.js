const fs = require('node:fs');
const path = __dirname + '/file.txt';
// Asynchronous
fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
