const fs = require('fs');

const directory = './audio';

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlinkSync(`${directory}/${file}`);
  }
});

