const path = require('path');
const fs = require('fs');
const { assembly } = require('./assembly');

const writeJSON = (json, fileName) => {
  const jsonFolderPath = './json';
  const jsonFilePath = path.join(jsonFolderPath, `${fileName}.json`)
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFilePath, json, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'JSON File created!'
      });
    });
  });
};

const writeTxtFile = (transcriptRes, fileName, folderName) => {
  const folderPath = folderName;
  const filePath = path.join(folderPath, `${fileName}.txt`)
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, transcriptRes, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Paragraph Text File created!'
      });
    });
  });
};


const writeUtterances = (uterrances, fileName, folderName) => {
  const folderPath = folderName;
  const filePath = path.join(folderPath, `${fileName}.txt`)
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, uterrances, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Speaker/Channel File created!'
      });
    });
  });
};

const writeCaptions = (srtResponse, fileName, folderName, captionType) => {
  const folderPath = folderName;
  const filePath = path.join(folderPath, `${fileName}.${captionType}`)
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, srtResponse, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Captions File created!'
      });
    });
  });
};

const createParagraphs = async (resData, fileName, folderName ) => {
  const { id }  = resData
  try {
    const response = await assembly.get(`/transcript/${id}/paragraphs`)
    const { data } = response
    const { paragraphs } = data

    let transcript = paragraphs.map(p => `${p.text} \n\n`).join('')
    writeTxtFile(transcript, fileName, folderName)

  } catch(err) {
    console.log(err);
  }
}


const createSpeakersFile = (resData, fileName, folderName) => {
  if(resData.utterances) {
    let speakers = resData.utterances.map(utterance => {
      return `Speaker ${utterance.speaker}: ${utterance.text} \n\n`
    }).join('')
  
    writeUtterances(speakers, fileName, folderName)

  } else {
    return false;
  }
}

const createSRTFile = async(resData, fileName, folderName) => {
  const { id }  = resData
  try {
    const response = await assembly.get(`/transcript/${id}/srt`)
    const { data } = response
    writeCaptions(data, fileName, folderName, 'srt')
  } catch(err) {
    console.log(err);
  }
}

const createSingleWordSRT = (resData, fileName, folderName ) => {
  const folderPath = folderName;
  const filePath = path.join(folderPath, `${fileName}.single.srt`)
  const { words } = resData
  let srtContent = '';
  let counter = 1;

  for (const word of words) {
    const start = new Date(word.start).toISOString().substr(11, 12).replace('.', ',');
    const end = new Date(word.end).toISOString().substr(11, 12).replace('.', ',');
    srtContent += `${counter}\n${start} --> ${end}\n${word.text}\n\n`;
    counter++;
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, srtContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'SRT File created!'
      });
    });
  });
};

const createVTTFile = async(resData, fileName, folderName) => {
  const { id }  = resData
  try {
    const response = await assembly.get(`/transcript/${id}/vtt`)
    const { data } = response
    writeCaptions(data, fileName, folderName, 'vtt')
  } catch(err) {
    console.log(err);
  }
}

module.exports = { writeJSON, createParagraphs, createSpeakersFile, createSRTFile, createVTTFile, createSingleWordSRT }