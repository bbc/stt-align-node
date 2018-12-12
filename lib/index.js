// const  diffMatchPath= require('./diff-match-patch-words/index.js');
const converterNumbersToWords = require('number-to-words');
const difflib = require('difflib');
const linear = require('everpolate').linear;


// https://github.com/chrisbaume/webaligner/blob/9458df57d854e9df64a54bc23a7f0856de49730f/webaligner.js#L7
// Chris's heuristic to estimate duration of a word, based on looking across a number of transcripts.
// estimates the duration of a word, in seconds
function calculateWordDuration(word) {
    return 0.08475 + (0.05379 * word.length);
}

// using neighboring words to set missing start and end time when present 
function interpolationOptimization(wordsList){
    return wordsList.map((word, index)=>{
        let wordTmp = word;
        // setting the start time of each unmatched word to the previous word’s end time - when present
        // does not first element in list edge case
        if(word.start === null &&( index !== 0)){
            let previousWord = wordsList[index-1];
            if( previousWord.end !== null){
                wordTmp = {
                    start: previousWord.end,
                    end: word.end,
                    word: word.word
                }
            }
        }
        // TODO: handle first item ?
        // setting the end time of each unmatched word to the next word’s start time - when present
        // does handle last element in list edge case
         if(word.end === null &&( index !== (wordsList.length-1))){
            let nextWord = wordsList[index+1];
            if( nextWord.start !== null){
                wordTmp = {
                    end: nextWord.start,
                    start: word.start,
                    word: word.word
                }
            }
        }
        // TODO: handle last item ?
        return wordTmp;
    })
    // return words;
}

function interpolate(wordsList){
    let words = interpolationOptimization(wordsList)
    const indicies = [...Array(words.length).keys()];
    let indiciesWithStart = [];
    let indiciesWithEnd = [];
    let startTimes = [];
    let endTimes = [];
    // interpolate times for start
    for (let i=0; i<words.length; i++) {
        if('start' in words[i]){
        indiciesWithStart.push(i);
        startTimes.push(words[i].start);
      }
    }
     // interpolate times for end
    for (let i=0; i<words.length; i++) {
        if(('end' in words[i])){
        indiciesWithEnd.push(i);
        endTimes.push(words[i].end);
      }
    }
    // http://borischumichev.github.io/everpolate/#linear
    const outStartTimes = linear(indicies, indiciesWithStart, startTimes);
    const outEndTimes = linear(indicies, indiciesWithEnd, endTimes);
    words = words.map((word, index)=>{
        if (!('start' in word)){
            word.start = outStartTimes[index];
        }
        if (!('end' in word) ){
            word.end = outEndTimes[index];
        }
        return word;
    })
    return words;
}

/**
 * 
 * @param {json} sttData 
 * @param {array} transcriptWords - array of words
 */
function alignWords(sttData, transcriptWords){
    // # extract list of words
    // sttWords=[words.get('word') for words in sttData]
   

    // # convert words to lowercase and remove numbers and special characters
    // sttWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in sttWords]
    const sttWordsStripped = sttData.map((word)=>{
         // TODO: replace numbers with letter numbers - converterNumbersToWords.toWords(2.9);
        return  word.word.toLowerCase().trim().replace(/[^a-z|0-9]+/g, '');
    })
    // .join(' ').trim();
  
    // transcriptWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in transcriptWords]
    const transcriptWordsStripped = transcriptWords.map((word)=>{
        // TODO: replace numbers with letter numbers
        return  word.toLowerCase().trim().replace(/[^a-z|0-9]+/g, '');
    })
    // .join(' ').trim();
    // # create empty list to receive data
    // transcriptData = [{} for _ in range(len(transcriptWords))]
    let transcriptData = [];
    // empty objects as place holder 
    transcriptWords.forEach(()=>{
        transcriptData.push({});
    })
    // # populate transcriptData with matching words
    // matcher = difflib.SequenceMatcher(None, sttWordsStripped, transcriptWordsStripped)
    // // if they are same length, just interpolate words ?
    // const matcher = diffWordMode(transcriptWordsStripped, sttWordsStripped);
    // http://qiao.github.io/difflib.js/
    const matcher = new difflib.SequenceMatcher(null, transcriptWordsStripped, sttWordsStripped);
    const opCodes  = matcher.getOpcodes();
    console.log(opCodes);

    opCodes.forEach((opCode)=>{
        let matchType = opCode[0];
        let sttFrom = opCode[1];
        let sttTo = opCode[2];
        let baseTextFrom = opCode[3];
        let baseTextTo= opCode[4];
        
        if(opCode[0] === 'equal'){
            let sttDataSegment = sttData.slice(sttFrom, sttTo);
            // inserting 
            transcriptData.splice(baseTextFrom, sttDataSegment.length, ...sttDataSegment);
        }
  
        transcriptData.forEach((wordObject, index)=>{
            wordObject.word = transcriptWords[index];
            // wordObject.start = null;
            // wordObject.end = null;
        })
        // # replace words with originals
        
    })
    // # fill in missing timestamps
    return interpolate(transcriptData);
}

/**
 * 
 * @param {json} sttWords - stt transcript json
 * @param {array} sttWords.words
 * @param {float} sttWords.words[0].start
 * @param {float} sttWords.words[0].end
 * @param {float} sttWords.words[0].word
 * @param {string} transcriptText - plain text corrected transcript, base text
 */
function alignJSONText(sttData, transcriptText){
    const sttWords = sttData.words;
    const aligned = alignWords(sttWords, transcriptText.trim().split(' '));
    return {'text': transcriptText, 'words': aligned}
}

module.exports = alignJSONText;
