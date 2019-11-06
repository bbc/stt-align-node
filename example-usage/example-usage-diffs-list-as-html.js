// const alignSTT = require('@bbc/stt-align-node').alignSTT;
const diffsListAsHtml = require('../src/index.js').diffsListAsHtml;
const fs = require('fs');

// file path relative to this file.
const transcriptStt = require('../sample/data/ted-talk/ted-talk-kate-kaldi.json').retval;
// file path relative to root
const transcriptText = fs.readFileSync('./sample/data/ted-talk/ted-talk-kate.txt').toString();
const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const result = diffsListAsHtml( transcriptStt, transcriptText,url );
// do something with the result
console.log(result);

fs.writeFileSync('./sample/output/ted-talk-kate-diffs.html',result);