const express = require('express')
const { assembly } = require('./assembly')
const url = require('url');
const { 
        writeJSON, 
        createParagraphs,
        createSpeakersFile,
        createSRTFile,
        createVTTFile,
        createSingleWordSRT,
      } = require('./utils')

// Initialize express and define a port
const app = express()
const PORT = 3000
app.use(express.json())

app.post('/webhook', (req, res) => {

  const { transcript_id } = req.body

  const getTranscription = async() => {

    try {   
      const response = await assembly.get(`/transcript/${transcript_id}`)
      const { data } = response
      const jsonRes = JSON.stringify(data)
      const { webhook_url } = data
      const parsedUrl = url.parse(webhook_url, true);
      const file = parsedUrl.query.file;

      writeJSON(jsonRes,file)
      createParagraphs(data, file, './text')
      createSpeakersFile(data, file, './speakers')
      createSRTFile(data, file, './srt')
      createVTTFile(data, file, './vtt')
      createSingleWordSRT(data, file, './single-word-srt')
      console.log(`${file} transcription complete.`)
          
    } catch(err) {
      console.log(err);
      res.status(400).send('Error')
    }  
  }

  getTranscription() 
  res.status(200).send(JSON.stringify(req.body))// Responding is important
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))