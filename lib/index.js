const  diffMatchPath= require('./diff-match-patch-words/index.js');
const converterNumbersToWords = require('number-to-words');
const linear = require('everpolate').linear;

const diffLib = new diffMatchPath();

// https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs
function diffWordMode(text1, text2) {   
    var a = diffLib.diff_linesToChars_(text1, text2);
    var lineText1 = a.chars1;
    var lineText2 = a.chars2;
    var lineArray = a.lineArray;
    var diffs = diffLib.diff_main(lineText1, lineText2, false);
    diffLib.diff_charsToLines_(diffs, lineArray);
    return diffs;
  }

// https://github.com/chrisbaume/webaligner/blob/9458df57d854e9df64a54bc23a7f0856de49730f/webaligner.js#L7
// Chris's heuristic to estimate duration of a word, based on looking across a number of transcripts.
// estimates the duration of a word, in seconds
function calculateWordDuration(word) {
    return 0.08475 + (0.05379 * word.length);
}

function interpolate(words){
    const indicies = [...Array(words.length).keys()];
    let indiciesWithStart = [];
    let startTimes = [];
  
    for (let i=0; i<words.length; i++) {
      if ('start' in words[i]) {
        indiciesWithStart.push(i);
        startTimes.push(words[i].start);
      }
    }
  
    const out = linear(indicies, indiciesWithStart, startTimes);
    
    for (let i=0; i<words.length; i++) {
      if (!('start' in words[i])) words[i].start = out[i];
    }
  
    return words;
}

/**
 * 
 * @param {json} sttData 
 * @param {array} transcriptWords - array of words
 */
function alignWords(sttData, transcriptWords){
    // console.log(sttData);
    // # extract list of words
    // sttWords=[words.get('word') for words in sttData]
    const sttWords = sttData.words;

    // # convert words to lowercase and remove numbers and special characters
    // sttWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in sttWords]
    const sttWordsStripped = sttWords.map((word)=>{
         // TODO: replace numbers with letter numbers - converterNumbersToWords.toWords(2.9);
        return  word.word.toLowerCase().trim().replace(/[^a-z|0-9]+/g, '');
    })
    .join(' ').trim();
  
    // transcriptWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in transcriptWords]
    const transcriptWordsStripped = transcriptWords.map((word)=>{
        // TODO: replace numbers with letter numbers
        return  word.toLowerCase().trim().replace(/[^a-z|0-9]+/g, '');
    })
    .join(' ').trim();
    // # create empty list to receive data
    // transcriptData = [{} for _ in range(len(transcriptWords))]
    let transcriptData = [];
    // # populate transcriptData with matching words
    // matcher = difflib.SequenceMatcher(None, sttWordsStripped, transcriptWordsStripped)
    // // if they are same length, just interpolate words ?
    const matcher = diffWordMode(transcriptWordsStripped, sttWordsStripped);
    console.log(matcher)
    // for tag, i1, i2, j1, j2 in matcher.get_opcodes():
    let wordIndexCounter = 0;
    matcher.forEach((match, index)=>{
        const diffType = match[0];
        const matchedText = match[1];
        const matchedTextList = matchedText.trim().split(' ');
        // console.log('matchedTextList: ', matchedTextList)
        // if(matchedTextList[0]!=="" && matchedTextList.length !== 0){
        //     if tag == 'equal':
        //         transcriptData[j1:j2] = sttData[i1:i2]
        //     // # replace words with originals
        //     // for i in range(len(transcriptData)):
        //     //     transcriptData[i]['word'] = transcriptWords[i];
            matchedTextList.forEach((text)=>{
                // console.log(text, wordIndexCounter,sttWords[wordIndexCounter])
               
                if(transcriptWords[wordIndexCounter] !== undefined){
                    console.log('sttWords[wordIndexCounter]',sttWords[wordIndexCounter], transcriptWords[wordIndexCounter] )
                // console.log('sttWords[wordIndexCounter]',wordIndexCounter)
                // if(sttWords[wordIndexCounter] !== undefined){
                    if(diffType === 0 ){
                        // console.log('sttWords[wordIndexCounter] ',sttWords)
                        transcriptData.push({
                            start: sttWords[wordIndexCounter].start,
                            end: sttWords[wordIndexCounter].end,
                            word: transcriptWords[wordIndexCounter] 
                        })
                        wordIndexCounter+=1;
                    }  
                    // TODO: could deal with substitution 
                    // keeping it simple adding deleted words without timecodes & ignoring inserted
                    // if(diffType === -1){
                    else{
                            let start = null;
                            let end = null;
                            transcriptData.push({
                                start: start,
                                end: end,
                                word: transcriptWords[wordIndexCounter]
                            })
                            wordIndexCounter+=1;
                        
                    //     }
                    
                    }
                }
            })
     
    })
    console.log('----transcriptData----');
    console.log(transcriptData);
    console.log('----');
    // # fill in missing timestamps
    return interpolate(transcriptData)
}

/**
 * 
 * @param {json} sttWords 
 * @param {string} transcriptText 
 */
function alignJSONText(sttWords, transcriptText){
    
    const aligned = alignWords(sttWords, transcriptText.trim().split(' '));
    return {'text': transcriptText, 'words': aligned}
}


module.exports = alignJSONText;