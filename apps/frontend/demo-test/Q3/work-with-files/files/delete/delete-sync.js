const fs = require('fs')

const path = 'writeFilePromise.txt'

try {
  fs.unlinkSync(path)
console.log("File removed.");
} catch(err) {
  console.error(err)
}