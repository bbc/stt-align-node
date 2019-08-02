const alignJSONText = require("./index.js").alignSTT;

const baseTextAccurateTranscription =
  "There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ";

describe("Re-align accurate transcript", () => {
  test("if STT correct - still expect transposed output", () => {
    const automatedSttTranscription = {
      words: [
        { start: 13.05, end: 13.21, word: "there" },
        { start: 13.21, end: 13.38, word: "is" },
        { start: 13.38, end: 13.44, word: "a" },
        { start: 13.44, end: 13.86, word: "day" },
        { start: 13.86, end: 14.13, word: "about" },
        { start: 14.13, end: 14.37, word: "ten" },
        { start: 14.37, end: 14.61, word: "years" },
        { start: 14.61, end: 15.15, word: "ago" },
        { start: 15.44, end: 15.67, word: "when" },
        { start: 15.67, end: 15.82, word: "i" },
        { start: 15.82, end: 16.19, word: "asked" },
        { start: 16.19, end: 16.27, word: "a" },
        { start: 16.27, end: 16.65, word: "friend" },
        { start: 16.65, end: 16.74, word: "to" },
        { start: 16.74, end: 17.2, word: "hold" },
        { start: 17.23, end: 17.32, word: "a" },
        { start: 17.32, end: 17.63, word: "baby" },
        { start: 17.63, end: 18.13, word: "dinosaur" },
        { start: 18.17, end: 18.61, word: "robot" },
        { start: 18.72, end: 19.17, word: "upside" },
        { start: 19.17, end: 19.56, word: "down" }
      ]
    };

    const expectedResult = {
      text: baseTextAccurateTranscription,
      words: [
        { end: 13.21, start: 13.05, word: "There" },
        { end: 13.325, start: 13.215, word: "was" },
        { end: 13.44, start: 13.38, word: "a" },
        { end: 13.86, start: 13.44, word: "day," },
        { end: 14.13, start: 13.86, word: "about" },
        { end: 14.37, start: 14.13, word: "10" },
        { end: 14.61, start: 14.37, word: "years" },
        { end: 15.44, start: 14.61, word: "ago," },
        { end: 15.67, start: 15.44, word: "when" },
        { end: 15.82, start: 15.67, word: "I" },
        { end: 16.19, start: 15.82, word: "asked" },
        { end: 16.27, start: 16.19, word: "a" },
        { end: 16.65, start: 16.27, word: "friend" },
        { end: 16.74, start: 16.65, word: "to" },
        { end: 17.23, start: 16.74, word: "hold" },
        { end: 17.32, start: 17.23, word: "a" },
        { end: 17.63, start: 17.32, word: "baby" },
        { end: 18.17, start: 17.63, word: "dinosaur" },
        { end: 18.72, start: 18.17, word: "robot" },
        { end: 19.17, start: 18.72, word: "upside" },
        { end: 19.56, start: 19.17, word: "down." }
      ]
    };

    const result = alignJSONText(
      automatedSttTranscription,
      baseTextAccurateTranscription
    );
    expect(result).toEqual(expectedResult.words);
  });
});

describe("Re-align  transcript - deletion", () => {
  test("1 deletion", () => {
    const automatedSttTranscription = {
      words: [
        { start: 13.05, end: 13.21, word: "there" },
        { start: 13.21, end: 13.38, word: "is" },
        { start: 13.38, end: 13.44, word: "a" },
        { start: 13.44, end: 13.86, word: "day" },
        { start: 13.86, end: 14.13, word: "about" },
        { start: 14.13, end: 14.37, word: "ten" },
        { start: 14.37, end: 14.61, word: "years" },
        { start: 14.61, end: 15.15, word: "ago" },
        { start: 15.44, end: 15.67, word: "when" },
        { start: 15.67, end: 15.82, word: "i" },
        { start: 15.82, end: 16.19, word: "asked" },
        { start: 16.19, end: 16.27, word: "a" },
        { start: 16.27, end: 16.65, word: "friend" },
        { start: 16.65, end: 16.74, word: "to" },
        { start: 16.74, end: 17.2, word: "hold" },
        { start: 17.23, end: 17.32, word: "a" },
        { start: 17.32, end: 17.63, word: "baby" },
        { start: 17.63, end: 18.13, word: "dinosaur" },
        { start: 18.17, end: 18.61, word: "robot" },
        { start: 18.72, end: 19.17, word: "upside" },
        { start: 19.17, end: 19.56, word: "down" }
      ]
    };

    const expectedResult = {
      text: baseTextAccurateTranscription,
      words: [
        { end: 13.21, start: 13.05, word: "There" },
        { end: 13.325, start: 13.215, word: "was" },
        { end: 13.44, start: 13.38, word: "a" },
        { end: 13.86, start: 13.44, word: "day," },
        { end: 14.13, start: 13.86, word: "about" },
        { end: 14.37, start: 14.13, word: "10" },
        { end: 14.61, start: 14.37, word: "years" },
        { end: 15.44, start: 14.61, word: "ago," },
        { end: 15.67, start: 15.44, word: "when" },
        { end: 15.82, start: 15.67, word: "I" },
        { end: 16.19, start: 15.82, word: "asked" },
        { end: 16.27, start: 16.19, word: "a" },
        { end: 16.65, start: 16.27, word: "friend" },
        { end: 16.74, start: 16.65, word: "to" },
        { end: 17.23, start: 16.74, word: "hold" },
        { end: 17.32, start: 17.23, word: "a" },
        { end: 17.63, start: 17.32, word: "baby" },
        { end: 18.17, start: 17.63, word: "dinosaur" },
        { end: 18.72, start: 18.17, word: "robot" },
        { end: 19.17, start: 18.72, word: "upside" },
        { end: 19.56, start: 19.17, word: "down." }
      ]
    };

    const result = alignJSONText(
      automatedSttTranscription,
      baseTextAccurateTranscription
    );
    expect(result).toEqual(expectedResult.words);
  });
});
