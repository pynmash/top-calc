let currentInput = "0";
let previousInput = null;
let currentOperator = null;
let shouldResetScreen = false;

let calcObject = {};

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(num1, num2, operator) {
  return operator(num1, num2);
}

function updateDisplay(num) {
  display.textContent = num;
}

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

updateDisplay(currentInput);

buttons.addEventListener("click", (e) => {
  const btn = e.target;
  const action = btn.textContent;

  if (
    !btn.classList.contains("operand") &&
    !btn.id.includes("button-equals") &&
    !btn.id.includes("button-reset")
  ) {
    if (currentInput === "0" || shouldResetScreen) {
      currentInput = action;
      shouldResetScreen = false;
    } else {
      currentInput += action;
    }
    updateDisplay(currentInput);
    return;
  }
});
