const fs = require('fs');

const path = __dirname + '\\file.txt';

fs.stat(path, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(
    stats.isFile(), // true
    stats.isDirectory(), // false
    stats.isSymbolicLink(), // false
    stats.size // 1024000 //= 1MB);
  );
});