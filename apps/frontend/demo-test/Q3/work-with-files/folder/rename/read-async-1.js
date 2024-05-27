const fs = require('fs/promises');

async function example() {
  try {
    await fs.rename('name2', 'name3');
   console.log("File renamed!");
  } catch (err) {
    console.log(err);
  }
}
example();