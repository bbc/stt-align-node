# Stt-align-node

<!-- _One liner + link to confluence page_  _Screenshot of UI - optional_ -->

See [The alignment problem](./docs/the-alignment-problem.md) in the docs for more background of the problem this module set out to address.

Originally developed as a node version of python's [stt-align](https://github.com/bbc/stt-align) by Chris Baume - BBC R&D.
 
## Setup - development

```
git clone git@github.com:pietrop/stt-align-node.git
```

```
cd stt-align-node
```

```
npm install
```

## Setup - in production

```
npm install stt-align-node
```
 

---

## Usage


Other then to realign STT results with accurate text, this modules can also be used to perform related oprations in the same domain, such as benchmarking STT.

|Function| Description | type|
|:------|------|----|
|`alignSTT`|Realign STT json with accurate text. by transposing words from accurate text to timecodes of STT. | `json`|
|`diffsList`|return a diff json of STT  vs accurate text | `json`|
|`diffsListAsHtml`|return a diff of STT  vs accurate text as HTML| `html`|
|`diffsCount`|return a diff of STT  vs accurate text as HTML| `json`|
|`calculateWordDuration`|return a diff of STT  vs accurate text as HTML| `Number`|


See [See `README` in `example-usage` folder](./example-usage/README.md) as well as [code examples](./example-usage) for more.

---

## System Architecture
<!-- _High level overview of system architecture_ -->

Node version of [stt-align](https://github.com/bbc/stt-align) by Chris Baume - R&D.

In _pseudo code_ overview of `alignSTT`:

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
Demo is in docs folder 

Publish demo to github pages 

```
npm run deploy:ghpages
```

## Tests

```
npm run test:watch
```

- [ ] add more tests 

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

Deploy to npm 

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
