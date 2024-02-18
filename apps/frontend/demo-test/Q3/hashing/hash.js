const { createHash } = require('crypto');
const fs = require('fs');
const inquirer = require('inquirer');
inquirer
  .prompt([
    {
      name: 'Input original file path',
    },
    {
      name: 'Input modified file path',
    },
  ])
  .then((answers) => {
    const originalFilePath = Object.values(answers)[0];
    const modifiedFilePath = Object.values(answers)[1];
    const buff = fs.readFileSync(__dirname + `\\${originalFilePath}`);
    const hash = createHash('md5').update(buff).digest('hex');
    console.log(['MD5 original file: '], hash);
    const buff1 = fs.readFileSync(__dirname + `\\${modifiedFilePath}`);
    const hash1 = createHash('md5').update(buff1).digest('hex');
    console.log(['MD5 modified file: '], hash1);
  });