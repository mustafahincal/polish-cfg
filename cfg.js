import prompt from "prompt"

const E = "a,b,X";
const S = "aa|bX|aXX";
const X = "ab|b";

// const {E,S,X} = await  prompt.get(["E","S","X"]);

let SPaths = S.split("|");
let XPaths = X.split("|");

let createdWord;
let createdWords = [];
let repeatedWords = [];
let control = 0;


const createWord = (expression) => {
    if(expression.includes("X")){
        XPaths.forEach((XPath) => {
            createdWord = expression.replace("X",XPath);
            if(createdWord.includes("X")){
                control = 1;
                createWord(createdWord);
            }else{
                if(control == 1){
                    repeatedWords.push(createdWord);
                }
                createdWords.push(createdWord);
                
            }
                
        })  
    }else{
        createdWords.push(expression);
    }
}   

SPaths.forEach((SPath) => {
    createWord(SPath);
})

console.log("Üretilen Kelimeler : " + createdWords);
console.log("Tekrarlanan Kelimeler : " + repeatedWords);