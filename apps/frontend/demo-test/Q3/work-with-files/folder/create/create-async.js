const fs = require('fs');
fs.mkdir('test_folder_1', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});