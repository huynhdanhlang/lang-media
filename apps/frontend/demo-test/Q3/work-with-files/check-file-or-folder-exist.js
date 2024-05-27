const fs = require('fs')

const path = __dirname + '\\file.txt';

try {
  if (fs.existsSync(path)) {
    console.log(['file exist 1']);
    //file or folder exists
  }
} catch(err) {
  console.error(err)
}