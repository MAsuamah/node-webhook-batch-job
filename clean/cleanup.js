const fs = require('fs');

const directoryNames = ['audio', 'json', 'single-word-srt', 'speakers', 'srt', 'vtt', 'text' ]

directoryNames.forEach(directoryName => {
  const directory = `./${directoryName}`;

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlinkSync(`${directory}/${file}`);
    }
  });
});
