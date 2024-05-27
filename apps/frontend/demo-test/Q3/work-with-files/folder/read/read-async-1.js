const path = __dirname + '/test-folder';
const fs = require('fs')

// The process.cwd() gives current
// working directory
fs.promises.readdir(path)

    // If promise resolved and
    // data are fetched
    .then(filenames => {
        for (let filename of filenames) {
            console.log(filename)
        }
    })

    // If promise is rejected
    .catch(err => {
        console.log(err)
    })