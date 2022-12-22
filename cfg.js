import scanf from "scanf";

/* const E = "a,b,X,Y";
const S = "aa|bX|aXY|bY";
const X = "ab|b";
const Y = "b|aa";
const bigLetters = ["X", "Y"];
const paths = {
  S: S.split("|"),
  X: X.split("|"),
  Y: Y.split("|"),
}; */

console.log("E : ");
const E = scanf("%s");
console.log("S : ");
const S = scanf("%s");
let paths = { S: S.split("|") };

const bigLetters = E.split(",").filter(
  (letter) => letter.toUpperCase() == letter
);

E.split(",").forEach((letter) => {
  if (letter.toUpperCase() === letter) {
    console.log(`${letter} : `);
    let temp = scanf("%s");
    paths = {
      ...paths,
      [letter]: temp.split("|"),
    };
  }
});

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
            console.log("word : " + createdWord + " control : " + control);
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
      control = 0;
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

console.log(`\n\nΣ = {${E}}`);
console.log(`S -> ${S}`);
bigLetters.forEach((letter) => {
  console.log(`${letter} -> ${paths[letter].join("|")}`);
});
console.log("Üretilen Kelimeler : " + createdWords);
console.log("Tekrarlanan Kelimeler : " + repeatedWords + "\n\n");
