// const alignSTT = require('@bbc/stt-align-node').alignSTT;
const alignSTT = require("../src/index.js").alignSTT;
const alignSTTwithPadding = require("../src/index.js").alignSTTwithPadding;

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

// this freezes:
// const result = alignSTT(transcriptSttTest, transcriptText, 16.19, 17.2);

// const start = 16.19;
// const end = 17.2;
// const PADLEFT = "Nwxskfsxn HHLPdJNbX KRrdghXzJ";
// const PADRIGHT = "XxjzKsmwK pHcdxnFch LmLXFdCVr";

// const result = alignSTT(
//   {
//     words: [
//       ...PADLEFT.split(" ").map((text) => ({ start, end: start, text })),
//       ...transcriptSttTest.words,
//       ...PADRIGHT.split(" ").map((text) => ({ start: end, end, text })),
//     ],
//   },
//   `${PADLEFT} ${transcriptText} ${PADRIGHT}`,
//   start,
//   end
// );

// console.log(JSON.stringify(result, null, 2));
// console.log(
//   JSON.stringify(
//     result.slice(PADLEFT.split(" ").length, -PADRIGHT.split(" ").length),
//     null,
//     2
//   )
// );

const result2 = alignSTTwithPadding(
  transcriptSttTest,
  transcriptText,
  16.19,
  17.2
);
console.log(JSON.stringify(result2, null, 2));

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
