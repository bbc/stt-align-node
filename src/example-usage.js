const fs = require('fs');
const diffsList = require('./index.js').diffsList;
const diffsListAsHtml = require('./index.js').diffsListAsHtml;
const alignSTT = require('./index.js').alignSTT;

// file path relative to root
const transcriptText = fs.readFileSync('./sample/data/ted-talk/ted-talk-kate.txt').toString();
// file path relative to this file.
const transcriptStt = require('../sample/data/ted-talk/ted-talk-kate-kaldi.json').retval;

// console.log(transcriptStt)
// const transcriptStt = { 
//     words: [
//         { start: 13.05, end: 13.21, word: 'there' },
//         { start: 13.21, end: 13.38, word: 'is' },
//         { start: 13.38, end: 13.44, word: 'a' },
//         { start: 13.44, end: 13.86, word: 'day' },
//         { start: 13.86, end: 14.13, word: 'about' },
//         { start: 14.13, end: 14.37, word: 'ten' },
//         { start: 14.37, end: 14.61, word: 'years' },
//         { start: 14.61, end: 15.15, word: 'ago' },
//         { start: 15.44, end: 15.67, word: 'when' },
//         { start: 15.67, end: 15.82, word: 'i' },
//         { start: 15.82, end: 16.19, word: 'asked' },
//         { start: 16.19, end: 16.27, word: 'a' },
//         { start: 16.27, end: 16.65, word: 'friend' },
//         { start: 16.65, end: 16.74, word: 'to' },
//         { start: 16.74, end: 17.2, word: 'hold' },
//         { start: 17.23, end: 17.32, word: 'a' },
//         { start: 17.32, end: 17.63, word: 'baby' },
//         { start: 17.63, end: 18.13, word: 'dinosaur' },
//         { start: 18.17, end: 18.61, word: 'robot' },
//         { start: 18.72, end: 19.17, word: 'upside' },
//         { start: 19.17, end: 19.56, word: 'down' }
//     ]
// }

// call function 
const resultHtml = diffsListAsHtml( transcriptStt, transcriptText);


const transcriptTextTrump = fs.readFileSync('./sample/data/trump-inauguration-2016/Trump-speech-correct.txt').toString();
  // TODO: generate STT on media (eg with pocketsphinx) and get json
const transcriptSttTrump = require('../sample/data/trump-inauguration-2016/Trump-inauguration-speech-2016-pocketsphinx.json');

const resultAligned = alignSTT(transcriptSttTrump, transcriptTextTrump)
console.log('-----result-----')
// do something with result 
console.log(resultAligned);

// const htmlResult = diffsListAsHtml(result);

fs.writeFileSync('./sample/output/ted-talk-kate-diffs.html',resultHtml);
fs.writeFileSync('./sample/output/trump-inauguration-speech-2016.json',JSON.stringify(resultAligned,null,2));
