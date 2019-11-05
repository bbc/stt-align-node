## Usage

### `alignSTT`
Usage for alignment

```js
const alignSTT = require('@bbc/stt-align-node').alignSTT;

const transcriptText = 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ';

const transcriptStt = { 
    words: [
    { start: 13.05, end: 13.21, text: 'there' },
    // { start: 13.21, end: 13.38, text: 'is' },
    { start: 13.38, end: 13.44, text: 'a' },
    // { start: 13.44, end: 13.86, text: 'day' },
    // { start: 13.86, end: 14.13, text: 'about' },
    { start: 14.13, end: 14.37, text: 'ten' },
    // { start: 14.37, end: 14.61, text: 'years' },
    { start: 14.61, end: 15.15, text: 'ago' },
    { start: 15.44, end: 15.67, text: 'when' },
    // { start: 15.67, end: 15.82, text: 'i' },
    // { start: 15.82, end: 16.19, text: 'asked' },
    // { start: 16.19, end: 16.27, text: 'a' },
    // { start: 16.27, end: 16.65, text: 'friend' },
    { start: 16.65, end: 16.74, text: 'to' },
    // { start: 16.74, end: 17.2, text: 'hold' },
    // { start: 17.23, end: 17.32, text: 'a' },
    // { start: 17.32, end: 17.63, text: 'baby' },
    // { start: 17.63, end: 18.13, text: 'dinosaur' },
    // { start: 18.17, end: 18.61, text: 'robot' },
    // { start: 18.72, end: 19.17, text: 'upside' },
    { start: 19.17, end: 19.56, text: 'down' } 
    ]
}

// call function 
const result = alignSTT( transcriptStt, transcriptText);
// do something with the result
console.log(result);
```

See [`/lib/example-usage`](./lib/example-usage.js) for an example that you can run with `npm run example`.

### Example output
 ```js
 { text: 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ',
  words:
   [ { start: 13.05, end: 13.21, text: 'There' },
     { text: 'was', start: 13.215, end: 13.325 },
     { start: 13.38, end: 13.44, text: 'a' },
     { text: 'day,', start: 13.626000000000001, end: 13.84 },
     { text: 'about', start: 13.872, end: 14.239999999999998 },
     { text: '10', start: 14.118, end: 14.639999999999999 },
     { text: 'years', start: 14.364, end: 15.04 },
     { end: 15.44, start: 14.61, text: 'ago,' },
     { start: 15.15, end: 15.67, text: 'when' },
     { text: 'I', start: 15.450000000000001, end: 15.883999999999999 },
     { text: 'asked', start: 15.75, end: 16.098 },
     { text: 'a', start: 16.05, end: 16.311999999999998 },
     { text: 'friend', start: 16.35, end: 16.525999999999996 },
     { start: 16.65, end: 16.74, text: 'to' },
     { text: 'hold',
       start: 17.009999999999998,
       end: 17.142857142857142 },
     { text: 'a', start: 17.369999999999997, end: 17.545714285714286 },
     { text: 'baby',
       start: 17.729999999999997,
       end: 17.948571428571427 },
     { text: 'dinosaur', start: 18.09, end: 18.35142857142857 },
     { text: 'robot', start: 18.45, end: 18.754285714285714 },
     { text: 'upside', start: 18.81, end: 19.15714285714286 },
     { start: 19.17, end: 19.56, text: 'down.' } ] }
```

There are other utilities, see `src/example-usage.js` for other examples of functions available as part of this module.

###  ``diffsList``
Diff list json 

```js
const diffsList = require('@bbc/stt-align-node').diffsList;
const transcriptText = 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ';
const transcriptStt //...
const resultHtml = diffsList( transcriptStt, transcriptText);
// returns a list of diffs as json 
```

[see `modbydick-diffs.json`](sample/output/modbydick-diffs.json) for an example output

You can also combine the output of this with `diffsListToHtml` to get an HTML representation. Or you can use the function below directly.

### `diffsListAsHtml`

Diff list as HTML
```js
const diffsListAsHtml = require('@bbc/stt-align-node').diffsListAsHtml;
const transcriptText = 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ';
const transcriptStt //...
// optional url 
const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const resultHtml = diffsListAsHtml( transcriptStt, transcriptText, url);
// or 
const resultHtml = diffsListAsHtml( transcriptStt, transcriptText);
// returns a list of diffs as html 
```

used by demo. 

### `diffsCount`

```js
const diffsCount = require('stt-align-node').diffsCount;
const transcriptText = 'There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ';
const transcriptStt //...
const resultCount = diffsCount( transcriptStt, transcriptText);
// returns a list of diffs as html 
```

### `calculateWordDuration`

Chris Baume's heuristic to estimate duration of a word, based on BBC R&D work looking across a number of (english) transcripts. It estimates the duration of a word, in seconds.

```js
const calculateWordDuration = require('stt-align-node').calculateWordDuration;
const word = 'Hello';
const wordDuration = calculateWordDuration(word);
// do something with the word duration 
```

_Has not been used when interpolating times for words, but it could be useful for other projects, when realigning or restoring timecodes_
