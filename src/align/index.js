//const linear = require('everpolate').linear;
const interpolateWordsTimes = require('./interpolateWordsTimes/index.js');

// https://stackoverflow.com/questions/22627125/grouping-consecutive-elements-together-using-javascript
function groupingConsecutive(data) {
  return data.reduce(function (a, b, i, v) {
    if (b !== undefined) {
      // ignore undefined entries
      if (v[i - 1] === undefined) {
        // if this is the start of a new run
        a.push([]); // then create a new subarray
      }
      a[a.length - 1].push(b); // append current value to subarray
    }
    return a; // return state for next iteration
  }, []); // initial top-level array
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
                    text: word.text
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
                    text: word.text
                }
            }
        }
        // TODO: handle last item ?
        return wordTmp;
    });
}

// after the interpolation, some words have overlapping timecodes.
// the end time of the previous word is greater then the start of the current word
// altho negligible when using in a transcript editor context
// we want to avoid this, coz it causes issues when using the time of the words to generate
// auto segmented captions. As it results in sentence
// boundaries overlapping on screen during playback
function adjustTimecodesBoundaries(words) {

    return words.map((word, index, arr) => {
      // excluding first element
      if (index != 0 ) {
        const previousWord = arr[index - 1];
        const currentWord = word;
        if (previousWord.end > currentWord.start) {
          word.start = previousWord.end;
        }
  
        return word;
      }
  
      return word;
    });
  }

/*function interpolate(wordsList, start, end) {
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

    if (start && indiciesWithStart[0] !== 0) {
        indiciesWithStart = [0, ...indiciesWithStart];
        startTimes = [start, ...startTimes];
    }

    // interpolate times for end
    for (let i=0; i<words.length; i++) {
        if('end' in words[i]){
        indiciesWithEnd.push(i);
        endTimes.push(words[i].end);
      }
    }

    if (end && indiciesWithEnd[indiciesWithEnd.length - 1] !== indicies[indicies.length - 1]) {
        indiciesWithEnd.push(indicies[indicies.length - 1]);
        endTimes.push(end);
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
    return adjustTimecodesBoundaries(words);
}*/

function interpolate(wordsList, optionalSegmentStartTime = 0) {
  const wordsListWithIndexes = wordsList.map((w, index) => {
    return { ...w, index };
  });

  const wordsWithoutTime = wordsListWithIndexes.map((word, index) => {
    if (!word.start && !word.end) {
      return { ...word, index };
    }
  });
  // console.log('wordsWithoutTime', wordsWithoutTime);
  const wordsWithTime = wordsListWithIndexes.map((word, index) => {
    if (word.start && word.end) {
      return { ...word, index };
    }
  });
  // console.log('wordsWithTime', wordsWithTime);

  const wordsListGroupedConsecutiveWithTime = groupingConsecutive(wordsWithTime);
  const wordsListGroupedConsecutive = groupingConsecutive(wordsWithoutTime);

  const wordsListGroupedConsecutiveInterpolated = wordsListGroupedConsecutive.map((group) => {
    if (group.length === 1) {
      const word = group[0];
      const wordIndex = word.index;
      // handle if previous word does not have timecode
      // eg handle if previous word is first word without timecode
      let wordStartTime;
      if (wordsListWithIndexes[wordIndex - 1]) {
        wordStartTime = wordsListWithIndexes[wordIndex - 1].end;
      } else {
        // TODO: should only apply if it's first word in list
        // index === 0
        wordStartTime = optionalSegmentStartTime;
      }
      // Handle edge case, when last word in the list
      // eg with inserted word at the end
      let wordEndTime;
      if (wordsListWithIndexes[wordIndex + 1]) {
        wordEndTime = wordsListWithIndexes[wordIndex + 1].start;
      } else {
        // const currentWordStart = wordsListWithIndexes[wordIndex].start;
        // const currentWordEnd = wordsListWithIndexes[wordIndex].end;
        // const duration = currentWordEnd - currentWordStart;
        wordEndTime = wordStartTime;
      }

      word.start = wordStartTime;
      word.end = wordEndTime;
      return [word];
    } else {
      // TODO: if first word then zero
      // TODO: if last word - not sure yet
      const firstWordIndex = group[0].index;
      const lastWordIndex = group[group.length - 1].index;
      const lineText = group
        .map((w) => {
          return w.text;
        })
        .join(' ');

      let lineStartTime;
      if (wordsListWithIndexes[firstWordIndex - 1]) {
        lineStartTime = wordsListWithIndexes[firstWordIndex - 1].end;
      } else {
        // TODO: should only apply if it's first word in list
        // index === 0
        lineStartTime = optionalSegmentStartTime;
      }

      // TODO: handling edge case, see above
      let lineEndTime;
      if (wordsListWithIndexes[lastWordIndex + 1]) {
        lineEndTime = wordsListWithIndexes[lastWordIndex + 1].start;
      } else {
        lineEndTime = lineStartTime;
      }

      const interpolatedWords = interpolateWordsTimes(
        lineText,
        lineStartTime,
        lineEndTime,
        firstWordIndex
      );
      return interpolatedWords;
    }
  });

  // recombining words
  const interpolatedWords = [
    wordsListGroupedConsecutiveWithTime.flat(),
    wordsListGroupedConsecutiveInterpolated.flat(),
  ].flat();

  // re-sort the word's
  const sortedWords = interpolatedWords.sort((a, b) => (a.index > b.index ? 1 : -1));

  // removing word's indexes from final output
  return sortedWords.map(({ start, end, text }) => {
    return { start, end, text };
  });
}

/*function alignRefTextWithSTT(opCodes, sttWords, transcriptWords, start, end) {
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
  
        // # populate transcriptData with matching words
        transcriptData.forEach((wordObject, index)=>{
            wordObject.text = transcriptWords[index];
        })
        // # replace words with originals
        
    })
    // # fill in missing timestamps
    return interpolate(transcriptData, start, end);
}*/

function alignRefTextWithSTT(opCodes, sttWords, transcriptWords, optionalSegmentStartTime = 0) {
  // # create empty list to receive data
  let transcriptData = [];
  // empty objects as place holder
  transcriptWords.forEach(() => {
    transcriptData.push({});
  });

  opCodes.forEach((opCode) => {
    let matchType = opCode[0];
    let sttStartIndex = opCode[1];
    let sttEndIndex = opCode[2];
    let baseTextStartIndex = opCode[3];
    let baseTextEndIndex = opCode[4];
    if (matchType === 'equal') {
      // slice does not not include the end - hence +1
      let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
      transcriptData.splice(baseTextStartIndex, sttDataSegment.length, ...sttDataSegment);
    }
    if (matchType === 'replace') {
      let sttDataSegment = sttWords.slice(sttStartIndex, sttEndIndex);
      let baseTextSegment = transcriptWords.slice(baseTextStartIndex, baseTextEndIndex);
      // The opcodes treat multiple words replacement in the base text against one of the stt words
      // transposing timecodes for replaced
      // altho for now all the same if more then one replaced
      let newDataSegment;
      if (sttDataSegment.length === baseTextSegment.length) {
        newDataSegment = baseTextSegment.map((w, index) => {
          return {
            start: sttDataSegment[index].start,
            end: sttDataSegment[index].end,
            text: w,
          };
        });
      }
      // TODO: There might be another edge case. Eg if there's more then one word
      // in sttDataSegment, but not as many as in baseTextSegment
      // we'd still want to try and transpose some of those timecodes
      // altho not 100% sure about what happens in this edge case
      //
      // below just a catch all where we use the timecodes from the first sttDataSegment word
      // across all thw rods in baseTextSegment
      else {
        newDataSegment = baseTextSegment.map((w) => {
          return {
            start: sttDataSegment[0].start,
            end: sttDataSegment[0].end,
            text: w,
          };
        });
      }

      transcriptData.splice(baseTextStartIndex, newDataSegment.length, ...newDataSegment);
    }
  });
  // # replace words with originals
  // # populate transcriptData with matching words
  const transcriptDataTransposedWordsText = transcriptData.map((wordObject, index) => {
    const wordO = { ...wordObject };
    wordO.text = transcriptWords[index];
    return wordO;
  });
  // # fill in missing timestamps
  return interpolate(transcriptDataTransposedWordsText, optionalSegmentStartTime);
}

module.exports = alignRefTextWithSTT;