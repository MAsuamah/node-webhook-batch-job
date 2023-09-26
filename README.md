# AssemblyAI Node Batch Transcription

## Setup

### ❗ Important ❗

You will need an ngrok account in order to use this application. [Sign up here!](https://dashboard.ngrok.com/signup)

1. After cloning the repo onto your local machine, cd into the root directory of the project (`node-webhook-batch-job`) and run `npm install`.
2. Create a `.env `file in the root of the project and add the following to your file. Your ngrok authorization token can be found in your ngrok user dashboard once you are logged in. It will be under the 'Your Authtoken' tab.

```
AAI_KEY="YOUR-KEY-HERE"
NGROK_KEY="YOUR-AUTH-TOKEN"
```

3. Add any audio/video files you would like to transcribe to the audio directory found in the root of this app.
4. Open the `app.js` file and enable/disable the models you would like to run. You can also add any models you'd like to use that aren't already there.
5. Run `npm start` and wait for the transcriptions to complete. The completion of the transcriptions will be logged in the console.

## Transcription Results

Find transcriptions in the appropriate folders:

- The `json` folder will hold the full json response.
- The `singl-word-srt` folder will hold an SRT file that has only one word per caption (this is useful for testing/reviewing timestamps).
- The `speakers` folder will hold a text file that separates out speakers if speaker labels were detected.
- The `srt` folder will hold srt files
- The `vtt` folder will hold vtt files
- The `text` folder will hold the complete transcript.

## Additional Scripts

-Run `node clean/cleanup.js` to empty the audio, json, speakers, single-word-srt, srt, text, and vtt directories.
-Run `node clean/clean-data.js` to empty the above directories except audio.
-Run `node clean/clean-audio.js` to empty the audio directory.
-Run `node removeSpaces.js` to re-write the file names in the audio directory to remove the spaces if there are any present.

## Further documentation

- [Consuming webhooks with node.js and express](https://medium.com/@BearerSH/consuming-webhooks-with-node-js-and-express-50e007fc7ae2)

- [Ngrok package](https://www.npmjs.com/package/ngrok)

## Contact Us

If you have any questions, please feel free to reach out to our Support team at support@assemblyai.com!
