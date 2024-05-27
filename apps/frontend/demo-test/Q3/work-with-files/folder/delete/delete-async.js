const fs = require('fs');
const dir = "new_test_folder";
fs.rmdir(dir, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});