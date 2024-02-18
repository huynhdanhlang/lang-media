var fs = require('fs');

fs.renameSync('file_renamed_again.txt', 'file_renamed_come_back.txt');
console.log('File Renamed.');