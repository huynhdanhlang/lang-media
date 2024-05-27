const fs = require('node:fs');
const content = 'Some content!';

fs.writeFile('writeFile.txt', content, err => {
  if (err) {
    console.error(err);
  }
console.log(" file written successfully");
});