//const diffsCount = require('stt-align-node').diffsCount;
const diffsCount = require('../src/index.js').diffsCount;
const fs = require('fs');

// file path relative to this file.
const transcriptStt = require('../sample/data/ted-talk/ted-talk-kate-kaldi.json').retval;
// file path relative to root
const transcriptText = fs.readFileSync('./sample/data/ted-talk/ted-talk-kate.txt').toString();

const result = diffsCount( transcriptStt, transcriptText);
// do something with the result
console.log(result);

fs.writeFileSync('./sample/output/ted-talk-kate-diffs-count.json',JSON.stringify(result,null,2));