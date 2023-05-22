const fs = require('fs');

console.log(
  fs.stat(__filename, (error, stats) => {
    console.log("🚀 ~ file: index.js:5 ~ fs.stat ~ __filename:", __filename)
    console.log(stats.isDirectory());
  })
);
