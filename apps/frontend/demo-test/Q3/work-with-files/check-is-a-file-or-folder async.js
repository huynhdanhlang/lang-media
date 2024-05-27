const fs = require('fs/promises');
const path = __dirname + '\\file.txt';

async function example() {
  try {
    const stats = await fs.stat(path);
    console.log(
      stats.isFile(), // true
      stats.isDirectory(), // false
      stats.isSymbolicLink(), // false
      stats.size // 1024000 //= 1MB);
    );
  } catch (err) {
    console.log(err);
  }
}
example();