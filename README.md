# Stt-align-node

node version of [stt-align](https://github.com/bbc/stt-align) by Chris Baume - R&D.
<!-- 
_One liner + link to confluence page_

_Screenshot of UI - optional_ -->

_Work in progress_
 
## Setup - development

```
git clon git@github.com:bbc/stt-align-node.git
```

```
cd stt-align-node
```

```
 npm install
```

## Setup - in production

```
npm install @bbc/stt-align-node
```
 

## Usage

Usage for alignment

```js
const alignJSONText = require('./index.js');

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
const result = alignJSONText( transcriptStt, transcriptText);
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

## System Architecture
<!-- _High level overview of system architecture_ -->

Node version of [stt-align](https://github.com/bbc/stt-align) by Chris Baume - R&D.

In _pseudo code_

- input, output as described in the example usage. 
    - Accurate base text transcription, string.
    - Array of word objects transcription from STT service.

- Align words
    - normalize words, by removing capitalization and punctuation and converting numbers to letters
    - generate array list of words from base text, and array list of words from stt transcript. 
        - get [opcodes](https://docs.python.org/2/library/difflib.html#difflib.SequenceMatcher.get_opcodes)  using `difflib` comparing two arrays
        - for equal matches, add matched STT word objects segment to results array base text index position.
        - Then iterate to result array to replace STT word objects text with words from base text  

    - interpolate missing words
        - calculates missing timecodes
        - first optimization 
            -  using neighboring words to do a first pass at setting missing start and end time when present 
            - 
        - Then Missing word timings are interpolated using interpolation library [`'everpolate`](http://borischumichev.github.io/everpolate/#linear).



## Development env
 <!-- _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_ -->

- node `10`
- npm `6.1.0`
 

## Build

```
npm run build
```

bundles the code with react, into a `./build` folder.


## build demo

```
npm run build:demo
```
demo is in docs folder using github pages

## Tests

```
npm run test:watch
```

- [ ] add more tests 

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

```
npm run publish:public
```

<!-- TODOs:

- [ ] Clean up repository
- [ ] change baseText and sttText mentions to be `referenceText` and `hypothesisText`
- [ ] add linting 
- [x] add babel(?)
- [ ] change if else to be switch statments
 -->
