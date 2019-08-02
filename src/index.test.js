const alignJSONText = require("./index.js").alignSTT;

const baseTextAccurateTranscription =
  "There was a day, about 10 years ago, when I asked a friend to hold a baby dinosaur robot upside down. ";

describe("Re-align accurate transcript", () => {
  test("if STT correct - still expect transposed output", () => {
    const automatedSttTranscription = {
      words: [
        { start: 13.05, end: 13.21, text: "there" },
        { start: 13.21, end: 13.38, text: "is" },
        { start: 13.38, end: 13.44, text: "a" },
        { start: 13.44, end: 13.86, text: "day" },
        { start: 13.86, end: 14.13, text: "about" },
        { start: 14.13, end: 14.37, text: "ten" },
        { start: 14.37, end: 14.61, text: "years" },
        { start: 14.61, end: 15.15, text: "ago" },
        { start: 15.44, end: 15.67, text: "when" },
        { start: 15.67, end: 15.82, text: "i" },
        { start: 15.82, end: 16.19, text: "asked" },
        { start: 16.19, end: 16.27, text: "a" },
        { start: 16.27, end: 16.65, text: "friend" },
        { start: 16.65, end: 16.74, text: "to" },
        { start: 16.74, end: 17.2, text: "hold" },
        { start: 17.23, end: 17.32, text: "a" },
        { start: 17.32, end: 17.63, text: "baby" },
        { start: 17.63, end: 18.13, text: "dinosaur" },
        { start: 18.17, end: 18.61, text: "robot" },
        { start: 18.72, end: 19.17, text: "upside" },
        { start: 19.17, end: 19.56, text: "down" }
      ]
    };

    const expectedResult = {
      text: baseTextAccurateTranscription,
      words: [
        { end: 13.21, start: 13.05, text: "There" },
        { end: 13.325, start: 13.215, text: "was" },
        { end: 13.44, start: 13.38, text: "a" },
        { end: 13.86, start: 13.44, text: "day," },
        { end: 14.13, start: 13.86, text: "about" },
        { end: 14.37, start: 14.13, text: "10" },
        { end: 14.61, start: 14.37, text: "years" },
        { end: 15.44, start: 14.61, text: "ago," },
        { end: 15.67, start: 15.44, text: "when" },
        { end: 15.82, start: 15.67, text: "I" },
        { end: 16.19, start: 15.82, text: "asked" },
        { end: 16.27, start: 16.19, text: "a" },
        { end: 16.65, start: 16.27, text: "friend" },
        { end: 16.74, start: 16.65, text: "to" },
        { end: 17.23, start: 16.74, text: "hold" },
        { end: 17.32, start: 17.23, text: "a" },
        { end: 17.63, start: 17.32, text: "baby" },
        { end: 18.17, start: 17.63, text: "dinosaur" },
        { end: 18.72, start: 18.17, text: "robot" },
        { end: 19.17, start: 18.72, text: "upside" },
        { end: 19.56, start: 19.17, text: "down." }
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
        { start: 13.05, end: 13.21, text: "there" },
        { start: 13.21, end: 13.38, text: "is" },
        { start: 13.38, end: 13.44, text: "a" },
        { start: 13.44, end: 13.86, text: "day" },
        { start: 13.86, end: 14.13, text: "about" },
        { start: 14.13, end: 14.37, text: "ten" },
        { start: 14.37, end: 14.61, text: "years" },
        { start: 14.61, end: 15.15, text: "ago" },
        { start: 15.44, end: 15.67, text: "when" },
        { start: 15.67, end: 15.82, text: "i" },
        { start: 15.82, end: 16.19, text: "asked" },
        { start: 16.19, end: 16.27, text: "a" },
        { start: 16.27, end: 16.65, text: "friend" },
        { start: 16.65, end: 16.74, text: "to" },
        { start: 16.74, end: 17.2, text: "hold" },
        { start: 17.23, end: 17.32, text: "a" },
        { start: 17.32, end: 17.63, text: "baby" },
        { start: 17.63, end: 18.13, text: "dinosaur" },
        { start: 18.17, end: 18.61, text: "robot" },
        { start: 18.72, end: 19.17, text: "upside" },
        { start: 19.17, end: 19.56, text: "down" }
      ]
    };

    const expectedResult = {
      text: baseTextAccurateTranscription,
      words: [
        { end: 13.21, start: 13.05, text: "There" },
        { end: 13.325, start: 13.215, text: "was" },
        { end: 13.44, start: 13.38, text: "a" },
        { end: 13.86, start: 13.44, text: "day," },
        { end: 14.13, start: 13.86, text: "about" },
        { end: 14.37, start: 14.13, text: "10" },
        { end: 14.61, start: 14.37, text: "years" },
        { end: 15.44, start: 14.61, text: "ago," },
        { end: 15.67, start: 15.44, text: "when" },
        { end: 15.82, start: 15.67, text: "I" },
        { end: 16.19, start: 15.82, text: "asked" },
        { end: 16.27, start: 16.19, text: "a" },
        { end: 16.65, start: 16.27, text: "friend" },
        { end: 16.74, start: 16.65, text: "to" },
        { end: 17.23, start: 16.74, text: "hold" },
        { end: 17.32, start: 17.23, text: "a" },
        { end: 17.63, start: 17.32, text: "baby" },
        { end: 18.17, start: 17.63, text: "dinosaur" },
        { end: 18.72, start: 18.17, text: "robot" },
        { end: 19.17, start: 18.72, text: "upside" },
        { end: 19.56, start: 19.17, text: "down." }
      ]
    };

    const result = alignJSONText(
      automatedSttTranscription,
      baseTextAccurateTranscription
    );
    expect(result).toEqual(expectedResult.words);
  });
});
