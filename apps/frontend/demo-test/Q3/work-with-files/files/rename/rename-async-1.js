const fs = require('fs');
const fsPromises = require('fs').promises;


(async function main() {
    try {

        // Rename the file
        fsPromises.rename('file_renamed.txt', 'file_renamed_again.txt')
        console.log("\nFile Renamed!\n");
    } catch (err) {
        console.error(err);
    }
})();