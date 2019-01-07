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

/**
 * https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
 * @param {*}  num 
 * @return {boolean} - if it's a number true, if it's not false.
 */
function isANumber(num){
    // console.log(num)
    return !isNaN(num) && num!=='';
}

/**
 * removes capitalization, punctuation and converts numbers to letters
 * @param {string} wordText - word text 
 * @return {string}
 * handles edge case if word is undefined, and returns undefined in that instance
 */
function normaliseWord(wordText){
    if(wordText!== undefined){
        let wordTextResult = wordText.toLowerCase().trim().replace(/[^a-z|0-9]+/g, '');
        if(isANumber(wordTextResult)){
            console.log('console',wordTextResult)
            return converterNumbersToWords.toWords(wordTextResult);
        }
        return wordTextResult;
    }else{
        return wordText
    }
        
}


// using neighboring words to set missing start and end time when present 
function interpolationOptimization(wordsList){
    return wordsList.map((word, index)=>{
        let wordTmp = word;
        // setting the start time of each unmatched word to the previous word’s end time - when present
        // does not first element in list edge case
       
        if(('start' in word) &&( index !== 0)){
            let previousWord = wordsList[index-1];
            if( 'end' in previousWord){
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
         if(('end' in word) &&( index !== (wordsList.length-1))){
            let nextWord = wordsList[index+1];
            if( 'start' in nextWord){
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
        if('end' in words[i]){
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

function alignBseTextWithSTT(opCodes, sttWords, transcriptWords){
    // # create empty list to receive data
    // transcriptData = [{} for _ in range(len(transcriptWords))]
    let transcriptData = [];
    // empty objects as place holder 
    transcriptWords.forEach(()=>{
        transcriptData.push({});
    })

    opCodes.forEach((opCode)=>{
        let matchType = opCode[0];
        let sttStartIndex = opCode[1];
        let sttEndIndex = opCode[2];
        let baseTextStartIndex = opCode[3];
        
        if(matchType === 'equal' ){
            // slice does not not include the end - hence +1
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            transcriptData.splice(baseTextStartIndex, sttDataSegment.length, ...sttDataSegment);
        }
  
        transcriptData.forEach((wordObject, index)=>{
            wordObject.word = transcriptWords[index];
        })
        // # replace words with originals
        
    })
    // # fill in missing timestamps
    return interpolate(transcriptData);
}

function diffList(opCodes, sttWords, transcriptWords){
    let resultDiffs = [];
    opCodes.forEach((opCode)=>{
        const matchType = opCode[0];
        let sttStartIndex = opCode[1];
        let sttEndIndex = opCode[2];
        let baseTextStartIndex = opCode[3];
        let baseTextEndIndex = opCode[4];
        // TODO: do I need to coun the words?
        if(matchType === 'equal' ){
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // add the number of words 
            resultDiffs.push({
                stt: sttDataSegment,
                baseText: baseTextSegment,
                matchType: matchType
            });
        }
        if(matchType === 'insert' ){
            // ~stt~ NA
            // base text
            // let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // relative to base text, words not recognised by STT count as deleted
            resultDiffs.push({
                stt: 'NA',
                baseText: baseTextSegment,
                matchType: 'delete'
            });
        }
        if(matchType === 'delete' ){
            // stt
            // ~base text~
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            // let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // relative to base text, words deleted from base text by STT count as inserted
            resultDiffs.push({
                stt: sttDataSegment,
                baseText: 'NA',
                matchType: 'insert'
            });
        }
        if(matchType === 'replace' ){
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // in replace need to count base text word count because stt words not always replaced with equal
            // number of words (?)
            resultDiffs.push({
                stt: sttDataSegment,
                baseText: baseTextSegment,
                matchType: matchType
            });
        }
        // console.log(resultDiffCount)
    })

    return resultDiffs;
}

function diffCount(opCodes, sttWords, transcriptWords){
    let resultDiffCount = {
        equal: 0,
        insert: 0,
        replace: 0,
        delete: 0, 
        baseTextTotalWordCount: transcriptWords.length
    }

    opCodes.forEach((opCode)=>{
        const matchType = opCode[0];
        let sttStartIndex = opCode[1];
        let sttEndIndex = opCode[2];
        let baseTextStartIndex = opCode[3];
        let baseTextEndIndex = opCode[4];
        // TODO: do I need to coun the words?
        if(matchType === 'equal' ){
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // add the number of words 
            resultDiffCount.equal+=baseTextSegment.length;
        }
        if(matchType === 'insert' ){
            // ~stt~ NA
            // base text
            // let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // relative to base text, words not recognised by STT count as deleted
            resultDiffCount.delete +=baseTextSegment.length; 
        }
        if(matchType === 'delete' ){
            // stt
            // ~base text~
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            // let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // relative to base text, words deleted from base text by STT count as inserted
            resultDiffCount.insert+= sttDataSegment.length;
        }
        if(matchType === 'replace' ){
            let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
            let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
            // in replace need to count base text word count because stt words not always replaced with equal
            // number of words (?)
            resultDiffCount.replace+= baseTextSegment.length;
        }
        // console.log(resultDiffCount)
    })

    return resultDiffCount;
}

/**
 * 
 * @param {array} sttData - array of STT words
 * @param {array} transcriptWords - array of base text accurate words
 */
function diffSttWithBaseText(sttWords, transcriptWords){
    // # extract list of words
    // sttWords=[words.get('word') for words in sttData]
   
    // # convert words to lowercase and remove numbers and special characters
    // sttWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in sttWords]
    const sttWordsStripped = sttWords.map((word)=>{
        return normaliseWord(word.word);
    })
  
    // transcriptWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in transcriptWords]
    const transcriptWordsStripped = transcriptWords.map((word)=>{
        return normaliseWord(word);
    })

    // # populate transcriptData with matching words
    // matcher = difflib.SequenceMatcher(None, sttWordsStripped, transcriptWordsStripped)
    // // if they are same length, just interpolate words ?
    // const matcher = diffWordMode(transcriptWordsStripped, sttWordsStripped);
    // http://qiao.github.io/difflib.js/
    const matcher = new difflib.SequenceMatcher(null,   sttWordsStripped, transcriptWordsStripped);
    const opCodes  = matcher.getOpcodes();
    const alignedResults = alignBseTextWithSTT(opCodes,sttWords,transcriptWords);

    const diffCountResults = diffCount(opCodes,sttWords,transcriptWords);
    const diffsListResults = diffList(opCodes,sttWords,transcriptWords);
    
    return {
        diffCount: diffCountResults,
        alignedWords: alignedResults,
        diffsList: diffsListResults
    };
}

function normaliseReferenceText(refText){
    // remove new lines
    return refText.trim().replace(/\n\n/g,'').replace(/\n/g,' ')
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
    const transcriptTextWithoutLineBreaks = normaliseReferenceText(transcriptText);
    const transcriptTextArray = transcriptTextWithoutLineBreaks.split(' ');
    const diffResults = diffSttWithBaseText(sttWords, transcriptTextArray);
    return {'text': transcriptText, 'aligned': diffResults.alignedWords, count: diffResults.diffCount, diffsList: diffResults.diffsList}
}

module.exports = alignJSONText;

module.exports.calculateWordDuration = calculateWordDuration;
