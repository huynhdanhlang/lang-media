const fs = require('fs');

const path = __dirname + '\\file.txt';

fs.access(path, fs.F_OK, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //file or folder exists
  console.log(['file exists']);
});