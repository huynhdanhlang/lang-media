const path = __dirname + '/file.txt';
const fs = require('fs/promises');
// Asynchronous
async function example() {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();