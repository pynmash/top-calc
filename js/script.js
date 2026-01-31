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

  if (btn.id === "button-decimal") {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay(currentInput);
    }
    return;
  }
  if (btn.id === "button-delete") {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
    updateDisplay(currentInput);
    return;
  }
  if (btn.id === "button-reset") {
    currentInput = "0";
    previousInput = null;
    currentOperator = null;
    shouldResetScreen = false;
    updateDisplay(currentInput);
    return;
  }
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
  if (btn.classList.contains("operand") && action !== "." && action !== "⌫") {
    previousInput = parseFloat(currentInput);
    currentOperator = operations[action];
    shouldResetScreen = true;
    return;
  }
  if (btn.id === "button-equals") {
    if (currentOperator && previousInput !== null) {
      const secondInput = parseFloat(currentInput);
      const result = operate(previousInput, secondInput, currentOperator);
      updateDisplay(result);
      currentInput = result.toString();
      previousInput = null;
      currentOperator = null;
    }
  }
});
