const fs = require('node:fs');
const path = __dirname + '/file.txt';
// Synchronous
try {
  const data = fs.readFileSync(path, 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}