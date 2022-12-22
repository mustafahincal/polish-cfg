import prompt from "prompt";

const E = "a,b,X";
const S = "aa|bX|aXY";
const X = "ab|b";
const Y = "b|aa";
const bigLetters = ["X", "Y"];

// const {E,S,X} = await  prompt.get(["E","S","X"]);

const paths = {
  S: S.split("|"),
  X: X.split("|"),
  Y: Y.split("|"),
};

let createdWord;
let createdWords = [];
let repeatedWords = [];
let control = 0;

const createWord = (expression) => {
  if (bigLetters.some((bigLetter) => expression.includes(bigLetter))) {
    bigLetters.forEach((letter) => {
      if (expression.includes(letter)) {
        paths[letter].forEach((path) => {
          createdWord = expression.replace(letter, path);
          if (bigLetters.some((bigLetter) => createdWord.includes(bigLetter))) {
            control = 1;
            createWord(createdWord);
          } else {
            if (control == 1) {
              if (!repeatedWords.find((word) => word === createdWord)) {
                repeatedWords.push(createdWord);
              }
            }
            if (!createdWords.find((word) => word === createdWord)) {
              createdWords.push(createdWord);
            }
          }
        });
      }
    });
  } else {
    if (!createdWords.find((word) => word === expression)) {
      createdWords.push(expression);
    }
  }
};

paths.S.forEach((SPath) => {
  createWord(SPath);
});

console.log("Üretilen Kelimeler : " + createdWords);
console.log("Tekrarlanan Kelimeler : " + repeatedWords);
