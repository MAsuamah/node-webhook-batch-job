const fs = require('fs');
const path = require('path');

function removeSpacesFromFilenames(directory) {
  // Read the contents of the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Iterate over all files in the directory
    files.forEach((filename) => {
      // Construct the full path to the file
      const oldPath = path.join(directory, filename);

      // Check if the path is a file
      fs.stat(oldPath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isFile()) {
          // Remove spaces from the file name
          const newFilename = filename.replace(/ /g, '-');

          // Construct the full path to the new file
          const newPath = path.join(directory, newFilename);

          // Rename the file
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error('Error renaming file:', err);
              return;
            }
            console.log(`Renamed: ${oldPath} -> ${newPath}`);
          });
        }
      });
    });
  });
}

// Provide the directory path
const directoryPath = './audio';

// Call the function to remove spaces from file names in the directory
removeSpacesFromFilenames(directoryPath);