const fs = require('fs');
const  diffMatchPath= require('./diff-match-patch-words.js')

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

// interpolates timings of missing words 
function interpolate(wordObjectsList){
    let resultWordsList = [];
    // console.log(wordObjectsList);
    wordObjectsList.forEach((word, index)=>{
        // check if word needs interpolating 
        if(word.start === null){
            // not first or last word
            if((index !== 0) && (index !==(wordObjectsList.length-1))){
                const previousWord = wordObjectsList[index-1];
                const nextWord = wordObjectsList[index+1];
                // console.log(word, previousWord.end,nextWord.start)
                resultWordsList.push({
                    start: previousWord.end, 
                    end: nextWord.start,
                    word: word.word,
                })
            }
            // TODO: handle first and last word edge case
            // eg first word missing previous word for end time -> current word start time
            // last word missing next word for start time -> current word end time
            // can use  calculateWordDuration

        }
        else{
            resultWordsList.push(word);
        }
    })
    return resultWordsList
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
        return  word.word.toLowerCase().trim().replace(/[^a-z]+/g, '')
    })
    .join(' ');
  
    // transcriptWordsStripped = [re.sub('[^a-z]', '', word.lower()) for word in transcriptWords]
    const transcriptWordsStripped = transcriptWords.map((word)=>{
        return  word.toLowerCase().trim().replace(/[^a-z]+/g, '');
    })
    .join(' ');
    // # create empty list to receive data
    // transcriptData = [{} for _ in range(len(transcriptWords))]
    let transcriptData = [];
    // # populate transcriptData with matching words
    // matcher = difflib.SequenceMatcher(None, sttWordsStripped, transcriptWordsStripped)
    const matcher = diffWordMode(transcriptWordsStripped, sttWordsStripped);
    // for tag, i1, i2, j1, j2 in matcher.get_opcodes():
    let wordIndexCounter = 0;
    matcher.forEach((match, index)=>{
        const diffType = match[0];
        const matchedText = match[1];
        const matchedTextList = matchedText.trim().split(' ');
        const matchedTextWordCountIndex = matchedTextList.length -1;
        // console.log(matchedTextList)
        //     if tag == 'equal':
        //         transcriptData[j1:j2] = sttData[i1:i2]
        //     // # replace words with originals
        //     // for i in range(len(transcriptData)):
        //     //     transcriptData[i]['word'] = transcriptWords[i];
            matchedTextList.forEach((matchedTextWord)=>{
                if(diffType === 0){
                    transcriptData.push({
                        end: sttWords[wordIndexCounter].end,
                        start: sttWords[wordIndexCounter].start,
                        word: transcriptWords[wordIndexCounter]
                    })
                    wordIndexCounter+=1;
                }  
                // TODO: could deal with substitution 
                // keeping it simple adding deleted words without timeocodes
                // ignoring inserted
                if(diffType === -1){
                    transcriptData.push({
                        end: null,
                        start: null,
                        word: transcriptWords[wordIndexCounter]
                    })
                    wordIndexCounter+=1;
                }
            })
    })
    // # fill in missing timestamps
    return interpolate(transcriptData)
}

/**
 * 
 * @param {json} sttWords 
 * @param {string} transcriptText 
 */
function alignJSONText(sttWords, transcriptText){
    
    const aligned = alignWords(sttWords, transcriptText.split(' '));
    return {'text': transcriptText, 'words': aligned}
}


///// example usage
console.log(' ----- ')

  
// file path relative to root
const transcriptText = fs.readFileSync('./sample/data/short/transcript.txt').toString();
// file path relative to this file.
const transcriptStt = require('../sample/data/short/transcript.json');

const result = alignJSONText( transcriptStt, transcriptText);

console.log(result);