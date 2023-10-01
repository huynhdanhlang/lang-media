const fs = require('fs');

try {
  fs.renameSync('name3', 'name4');
  console.log("File renamed!")
} catch (err) {
  console.error(err);
}