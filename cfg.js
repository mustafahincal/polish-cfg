import scanf from "scanf";

/*
examples datas
const E = "a,b,X,Y";
const S = "aa|bX|aXX|bYZ|aZ";
const X = "ab|bb";
const Y = "a|ba";
const Z = "a|ab";
const bigLetters = ["X", "Y", "Z"];
const paths = {
  S: S.split("|"),
  X: X.split("|"),
  Y: Y.split("|"),
  Z: Z.split("|"),
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
  control = 0;
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
console.log("Tekrarlanan Kelimeler : " + repeatedWords + "\n");
