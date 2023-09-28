const fs = require('fs');

const content = 'Some content!';

try {
  fs.writeFileSync('writeFileSync.txt', content);
  // file written successfully
  console.log('file written successfully')
} catch (err) {
  console.error(err);
}