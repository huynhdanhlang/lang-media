const fs = require('fs');
const fsPromises = fs.promises;
  
fsPromises.mkdir('fs_test2').then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('failed to create directory');
});