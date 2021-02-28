// const alignSTT = require('@bbc/stt-align-node').alignSTT;
const alignSTT = require('../src/index.js').alignSTT;

const transcriptText = 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down.';

const transcriptSttTest = {
    "words": [
        {
          "text": "there"
        },
        {
          "text": "is"
        },
        {
          "text": "a"
        },
        {
          "text": "day"
        },
        {
          "text": "about"
        },
        {
          "start": 14.13,
          "end": 14.37,
          "text": "ten"
        },
        {
          "start": 14.37,
          "end": 14.61,
          "text": "years"
        },
        {
          "start": 14.61,
          "end": 15.15,
          "text": "ago"
        },
        {
          "start": 15.44,
          "end": 15.67,
          "text": "when"
        },
        {
          "start": 15.67,
          "end": 15.82,
          "text": "i"
        },
        {
          "start": 15.82,
          "end": 16.19,
          "text": "asked"
        },
        {
          "start": 16.19,
          "end": 16.27,
          "text": "a"
        },
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
        {
          "start": 17.23,
          "end": 17.32,
          "text": "a"
        },
        {
          "start": 17.32,
          "end": 17.63,
          "text": "baby"
        },
        {
          "text": "dinosaur"
        },
        {
          "text": "robot"
        },
        {
          "text": "upside"
        },
        {
          "text": "down"
        }
      ]
    };


const result = alignSTT( transcriptSttTest, transcriptText, 13.05, 19.6);
console.log(JSON.stringify(result, null, 2));
