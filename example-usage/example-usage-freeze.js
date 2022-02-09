// const alignSTT = require('@bbc/stt-align-node').alignSTT;
const alignSTT = require("../src/index.js").alignSTT;

// Note: this freezes, see the example usage with padding as a workaround

const transcriptText = "friend to hold";

const transcriptSttTest = {
  words: [
    {
      start: 16.27,
      end: 16.65,
      text: "friend",
    },
    {
      text: "2",
    },
    {
      start: 16.74,
      end: 17.2,
      text: "held",
    },
  ],
};

const result = alignSTT(transcriptSttTest, transcriptText, 16.19, 17.2);
console.log(JSON.stringify(result, null, 2));

/* original timings
{
"start": 16.27,
"end": 16.65,
"text": "friend"
},
{
"start": 16.65,
"end": 16.74,
"text": "to"
},
{
"start": 16.74,
"end": 17.2,
"text": "hold"
},
*/
