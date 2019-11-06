// const calculateWordDuration = require('@bbc/stt-align-node').calculateWordDuration;
const calculateWordDuration = require('../src/index.js').calculateWordDuration;

const word = 'Hello';
const wordDuration = calculateWordDuration(word);
// do something with the result
console.log(wordDuration);
