// const alignSTT = require('@bbc/stt-align-node').alignSTT;
const alignSTT = require("../src/index.js").alignSTT;

const transcriptText = "friend to hold MFJrgRpKH pbTFFLsRk vRzcmnrnT";

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
    {
      start: 17.2,
      end: 17.2,
      text: "MFJrgRpKH",
    },
    {
      start: 17.2,
      end: 17.2,
      text: "pbTFFLsRk",
    },
    {
      start: 17.2,
      end: 17.2,
      text: "vRzcmnrnT",
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
