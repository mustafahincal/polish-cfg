import prompt from "prompt";

// const input = "* + * + 1 2 + 3 4 5 6";
let stack = [];
let firstItem, secondItem;

const { input } = await prompt.get("input");

const inputArray = input.split(" ").reverse();
console.log(inputArray);

const calculate = (operator, x, y) => {
  if (operator === "+") {
    return x + y;
  } else if (operator === "-") {
    return x - y;
  } else if (operator === "*") {
    return x * y;
  } else if (operator === "/") {
    return x / y;
  }
};
inputArray.forEach((item) => {
  if (!isNaN(Number(item))) {
    stack.push(Number(item));
  } else {
    firstItem = stack.pop();
    secondItem = stack.pop();
    stack.push(calculate(item, firstItem, secondItem));
  }
});

console.log(stack);
