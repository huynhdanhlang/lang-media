const fs = require('fs');
const fsPromises = require('fs').promises;

(async function main() {
    try {

        fsPromises.rmdir("test_folder_1")
        console.log("Folder Deleted!");
    } catch (err) {
        console.error(err);
    }
})();