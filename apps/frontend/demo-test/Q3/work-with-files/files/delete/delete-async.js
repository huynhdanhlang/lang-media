const fs = require('fs')

const path = 'writeFile.txt'

fs.unlink(path, (err) => {
  if (err) {
    console.error(err)
    return;
  }

console.log("File removed");
});