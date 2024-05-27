const fs = require('fs');
const dir = 'name1';
fs.rename(dir, 'name2', err => {
  if (err) {
    console.error(err);
  }
  console.log("Folder renamed!")
});