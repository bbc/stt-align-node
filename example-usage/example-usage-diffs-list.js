// const diffsList = require('stt-align-node').diffsList;
const diffsList = require('../src/index.js').diffsList;
const fs = require('fs');

// file path relative to this file.
const transcriptStt = require('../sample/data/ted-talk/ted-talk-kate-kaldi.json').retval;
// file path relative to root
const transcriptText = fs.readFileSync('./sample/data/ted-talk/ted-talk-kate.txt').toString();

const result = diffsList( transcriptStt, transcriptText);
// do something with the result
console.log(JSON.stringify(result,null,2));

fs.writeFileSync('./sample/output/ted-talk-kate-diffs-list.json',JSON.stringify(result,null,2));