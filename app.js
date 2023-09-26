const ngrok = require('ngrok');
const { assembly } = require('./assembly');
const fs = require('fs');
const directoryPath = './audio';
require('dotenv').config()

const getTranscript = async () => {

  try {
    const url = await ngrok.connect({
      addr: 3000,
      authtoken: process.env.NGROK_KEY,
      region: 'us'
    });
    
    fs.readdir(directoryPath, (err, files) => {
  
      if (err) {
        console.error('Error reading directory: ', err);
        return;
      }
  
        files.forEach((fileName) => {
          const filePath = `${directoryPath}/${fileName}`
          
          fs.readFile(filePath, (err, data) => { 
            if (err) return console.error(err);
    
            assembly
              .post("/upload", data)
              .then((res) => {
                assembly.post("/transcript", {
                  audio_url: res.data.upload_url,
                  webhook_url: `${url}/webhook?file=${fileName}`,
                  //language_code: "es",
                  //speaker_labels: true,
                  //language_detection: true,
                  //content_safety: true,
                  //sentiment_analysis: true,
                  //entity_detection: true,
                  //iab_categories: true,
                  //auto_chapters: true,
                  // auto_highlights: true
              }).catch(err => {
                // Handle any rejected Promises or uncaught exceptions here
                console.error(err);
              });   
            })
          })
        });
    });

  } catch {
    console.log(err);
  }
}

getTranscript()


module.exports = { getTranscript }